// src/pages/Research.jsx
import { useEffect, useMemo, useState } from 'react';
import sanityClient from '../SanityClient.js';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FilterDrawer } from '../components/FilterDrawer.jsx';
import { DrawerModalResearch } from '../components/DrawerModalResearch.jsx';

// helpers -------------------------------------------------
const normalize = v =>
	(v ?? '')
		.toString()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();

function ptToPlain(blocks) {
	if (!Array.isArray(blocks)) return '';
	try {
		return blocks.map(b => (Array.isArray(b?.children) ? b.children.map(c => c?.text || '').join('') : '')).join('\n');
	} catch {
		return '';
	}
}

function buildHaystack(item, lang) {
	const parts = [];
	parts.push(item?.programa);

	// títulos / descrições
	if (lang === 'pt') {
		parts.push(item?.titulo, ptToPlain(item?.descricao));
	} else {
		parts.push(item?.tituloEN, ptToPlain(item?.descricaoEN));
	}

	// ficha técnica (nomes + funções)
	const ft = lang === 'pt' ? item?.fichatecnica : item?.fichatecnicaEN;
	if (Array.isArray(ft)) {
		for (const p of ft) {
			parts.push(p?.nome, p?.funcao);
		}
	}

	return normalize(parts.filter(Boolean).join(' • '));
}

// ---------------------------------------------------------

export function Research() {
	const [raw, setRaw] = useState([]);
	const [selectedDoc, setSelectedDoc] = useState(null);
	const { lang } = useLanguage();

	// estado do filtro
	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState('');

	// fetch
	useEffect(() => {
		const fetchInvestigacao = async () => {
			try {
				const data = await sanityClient.fetch(`*[_type == "investigacao"] | order(programa asc) {
          _id,
          programa,
          titulo,
          tituloEN,
          descricao,
          descricaoEN,
          thumbnail,
          imagens[],
          fichatecnica[] {nome, funcao},
          fichatecnicaEN[] {nome, funcao},
          archiveAudioUrl
        }`);
				setRaw(data || []);
			} catch (error) {
				console.error('Erro ao buscar investigação:', error.message);
			}
		};
		fetchInvestigacao();
	}, []);

	// mudar idioma → limpa pesquisa
	useEffect(() => {
		setSearchText('');
	}, [lang]);

	// filtragem por texto
	const filtered = useMemo(() => {
		const q = normalize(searchText);
		if (!q) return raw;
		return raw.filter(item => buildHaystack(item, lang).includes(q));
	}, [raw, lang, searchText]);

	// sincronização com Header para o botão FILTER + contador
	useEffect(() => {
		const onToggle = () => setIsOpen(v => !v);
		window.addEventListener('archive-filter-toggle', onToggle);
		return () => window.removeEventListener('archive-filter-toggle', onToggle);
	}, []);

	useEffect(() => {
		window.dispatchEvent(
			new CustomEvent('archive-filter-state', {
				detail: { isOpen, count: filtered.length },
			}),
		);
	}, [isOpen, filtered.length]);

	if (!raw || raw.length === 0) return null;

	return (
		<div className='relative container-default'>
			{/* Drawer de filtros – só texto aqui (sem categorias/tipos) */}
			<FilterDrawer
				key={`drawer-research-${lang}`}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				searchText={searchText}
				setSearchText={setSearchText}
				facetsCats={[]} // sem categorias neste schema
				facetsTypes={[]} // sem tipos neste schema
				selectedCats={new Set()} // não usados
				selectedTypes={new Set()} // não usados
				toggleCat={() => {}}
				toggleType={() => {}}
				clearAll={() => setSearchText('')}
				visibleCount={filtered.length}
				availableCats={new Set()}
				availableTypes={new Set()}
			/>

			{/* Wrapper que “encolhe” ao abrir a gaveta */}
			<div className={isOpen ? 'with-drawer-padding' : 'without-drawer-padding'}>
				<div className='flex flex-col items-center'>
					<ul className={`grid grid-cols-1 ${isOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
						{filtered.map(doc => {
							const title = (lang === 'pt' ? doc?.titulo : doc?.tituloEN) || doc?.titulo || doc?.tituloEN || '—';
							const cover = doc?.thumbnail ? urlFor(doc.thumbnail).url() : null;

							return (
								<li
									key={doc._id}
									onClick={() => setSelectedDoc(doc)}
									className='border-[.5px] border-[#666566] hover:opacity-40 rounded-[15px] transition duration-500 cursor-pointer h-full flex flex-col '
								>
									{/* imagem (opcional) */}
									{cover && <img src={cover} alt={title} className='rounded-t-2xl w-full h-[250px] object-cover' />}

									{/* corpo */}
									<div className='m-4 flex flex-col flex-grow '>
										{/* título */}
										<div className='text-[#eaebde] text-[1.15rem] font-semibold  leading-[1.3]'>{title}</div>

										{/* excerto opcional (primeiras linhas da descrição) */}
										{(() => {
											const plain = lang === 'pt' ? ptToPlain(doc?.descricao) : ptToPlain(doc?.descricaoEN);
											const excerpt = plain?.trim()?.slice(0, 140);
											return excerpt ? (
												<div className='text-sm opacity-70 mt-3 line-clamp-3'>
													{excerpt}
													{plain.length > 140 ? '…' : ''}
												</div>
											) : null;
										})()}
									</div>
								</li>
							);
						})}
					</ul>
				</div>

				<DrawerModalResearch isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)} doc={selectedDoc} />
			</div>
		</div>
	);
}
