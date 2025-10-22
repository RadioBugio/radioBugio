import { useEffect, useMemo, useState } from 'react';
import sanityClient from '../SanityClient.js';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { DrawerModal } from '../components/DrawerModal.jsx';
import { useLanguage } from '../context/LanguageContext';
import { FilterDrawer } from '../components/FilterDrawer';

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

function getItemCats(item, lang) {
	const arr = [];
	if (lang === 'pt') {
		if (Array.isArray(item?.clusters)) arr.push(...item.clusters);
	} else {
		if (Array.isArray(item?.clustersEN)) arr.push(...item.clustersEN);
	}
	return arr.filter(Boolean);
}

function getItemTypes(item, lang) {
	const v = lang === 'pt' ? item?.clusters2 : item?.clusters2_EN;
	return v ? [v] : [];
}

function buildHaystack(item, lang) {
	const parts = [];
	parts.push(item?.programa);

	if (item?.data) {
		const d = item.data;
		parts.push(`${d?.dia} ${d?.mes} ${d?.ano}`);
		parts.push(`${String(d?.dia).padStart(2, '0')}/${mesParaNumero(d?.mes)}/${d?.ano}`);
	}
	parts.push(item?.horario?.inicio);
	parts.push(item?.ano);

	if (lang === 'pt') {
		parts.push(item?.titulo, ptToPlain(item?.descricao));
		if (Array.isArray(item?.clusters)) parts.push(...item.clusters);
		parts.push(item?.clusters2);
	} else {
		parts.push(item?.tituloEN, ptToPlain(item?.descricaoEN));
		if (Array.isArray(item?.clustersEN)) parts.push(...item.clustersEN);
		parts.push(item?.clusters2_EN);
	}

	return normalize(parts.filter(Boolean).join(' • '));
}

function mesParaNumero(mes) {
	const mapa = {
		Janeiro: '01',
		Fevereiro: '02',
		Março: '03',
		Abril: '04',
		Maio: '05',
		Junho: '06',
		Julho: '07',
		Agosto: '08',
		Setembro: '09',
		Outubro: '10',
		Novembro: '11',
		Dezembro: '12',
	};
	return mapa[mes] || '';
}

const MONTHS_PT = {
	Janeiro: 'Jan',
	Fevereiro: 'Fev',
	Março: 'Mar',
	Abril: 'Abr',
	Maio: 'Mai',
	Junho: 'Jun',
	Julho: 'Jul',
	Agosto: 'Ago',
	Setembro: 'Set',
	Outubro: 'Out',
	Novembro: 'Nov',
	Dezembro: 'Dez',
};
const MONTHS_EN = {
	Janeiro: 'Jan',
	Fevereiro: 'Feb',
	Março: 'Mar',
	Abril: 'Apr',
	Maio: 'May',
	Junho: 'Jun',
	Julho: 'Jul',
	Agosto: 'Aug',
	Setembro: 'Sep',
	Outubro: 'Oct',
	Novembro: 'Nov',
	Dezembro: 'Dec',
};

function horaEnCompact(horaStr) {
	if (!horaStr) return '';
	const parts = horaStr.replace('h', ':').split(':');
	let h = parseInt(parts[0], 10);
	const m = parts[1] ? parts[1].padStart(2, '0') : '00';
	const ampm = h >= 12 ? 'pm' : 'am';
	h = h % 12;
	if (h === 0) h = 12;
	return m === '00' ? `${h}${ampm}` : `${h}:${m}${ampm}`;
}


function formatDateTimeLabel(dataObj, horario, lang) {
	if (!dataObj) return '';
	const dd = String(dataObj.dia ?? '').padStart(2, '0');
	const mmName = dataObj.mes;
	const yyyy = dataObj.ano;

	if (lang === 'pt') {
		const mon = MONTHS_PT[mmName] ?? mmName;
		const h = horario?.inicio || '';
		return [`${dd} ${mon} ${yyyy}`, h ? ` · ${h}` : ''].join('');
	} else {
		const mon = MONTHS_EN[mmName] ?? mmName;
		const h = horaEnCompact(horario?.inicio);
		return [`${mon} ${dd} ${yyyy}`, h ? ` · ${h}` : ''].join('');
	}
}


export function Archive() {
	const [raw, setRaw] = useState([]);
	const [selectedEp, setSelectedEp] = useState(null);
	const { lang } = useLanguage();

	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [selectedCats, setSelectedCats] = useState(() => new Set()); 
	const [selectedTypes, setSelectedTypes] = useState(() => new Set()); 

	useEffect(() => {
		const fetchArquivos = async () => {
			try {
				const data = await sanityClient.fetch(`*[_type == "arquivo"] | order(programa desc) {
          _id, programa, data, horario, ano,
          titulo, tituloEN, descricao, descricaoEN,
          clusters, clustersEN, clusters2, clusters2_EN,
          duracao, thumbnail, imagens[], archiveAudioUrl
        }`);
				setRaw(data || []);
			} catch (error) {
				console.error('Erro ao buscar arquivos:', error.message);
			}
		};
		fetchArquivos();
	}, []);

	useEffect(() => {
		setSearchText('');
		setSelectedCats(new Set());
		setSelectedTypes(new Set());
	}, [lang]);

	const facetsCats = useMemo(() => {
		const s = new Set();
		for (const it of raw) for (const c of getItemCats(it, lang)) s.add(c);
		return Array.from(s).sort((a, b) => a.localeCompare(b));
	}, [raw, lang]);

	const facetsTypes = useMemo(() => {
		const s = new Set();
		for (const it of raw) for (const t of getItemTypes(it, lang)) s.add(t);
		return Array.from(s).sort((a, b) => a.localeCompare(b));
	}, [raw, lang]);

	const filtered = useMemo(() => {
		const q = normalize(searchText);
		const hasText = q.length > 0;
		const hasCats = selectedCats.size > 0;
		const hasTypes = selectedTypes.size > 0;

		if (!hasText && !hasCats && !hasTypes) return raw;

		return raw.filter(item => {
			const textOk = hasText ? buildHaystack(item, lang).includes(q) : true;

			let catOk = true;
			if (hasCats) {
				const itemCats = new Set(getItemCats(item, lang).map(String));
				catOk = Array.from(selectedCats).some(c => itemCats.has(c));
			}

			let typeOk = true;
			if (hasTypes) {
				const itemTypes = new Set(getItemTypes(item, lang).map(String));
				typeOk = Array.from(selectedTypes).some(t => itemTypes.has(t));
			}

			return textOk && catOk && typeOk;
		});
	}, [raw, lang, searchText, selectedCats, selectedTypes]);

	const availableCats = useMemo(() => {
		const q = normalize(searchText);
		const hasText = q.length > 0;
		const hasTypes = selectedTypes.size > 0;

		const map = new Set();
		for (const item of raw) {
			const textOk = hasText ? buildHaystack(item, lang).includes(q) : true;

			let typeOk = true;
			if (hasTypes) {
				const itemTypes = new Set(getItemTypes(item, lang));
				typeOk = Array.from(selectedTypes).some(t => itemTypes.has(t));
			}

			if (textOk && typeOk) {
				for (const c of getItemCats(item, lang)) map.add(c);
			}
		}
		return map;
	}, [raw, lang, searchText, selectedTypes]);

	const availableTypes = useMemo(() => {
		const q = normalize(searchText);
		const hasText = q.length > 0;
		const hasCats = selectedCats.size > 0;

		const map = new Set();
		for (const item of raw) {
			const textOk = hasText ? buildHaystack(item, lang).includes(q) : true;

			let catOk = true;
			if (hasCats) {
				const itemCats = new Set(getItemCats(item, lang));
				catOk = Array.from(selectedCats).some(c => itemCats.has(c));
			}

			if (textOk && catOk) {
				for (const t of getItemTypes(item, lang)) map.add(t);
			}
		}
		return map;
	}, [raw, lang, searchText, selectedCats]);

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

	const toggleCat = cat => {
		setSelectedCats(prev => {
			const next = new Set(prev);
			next.has(cat) ? next.delete(cat) : next.add(cat);
			return next;
		});
	};
	const toggleType = typ => {
		setSelectedTypes(prev => {
			const next = new Set(prev);
			next.has(typ) ? next.delete(typ) : next.add(typ);
			return next;
		});
	};
	const clearAll = () => {
		setSearchText('');
		setSelectedCats(new Set());
		setSelectedTypes(new Set());
	};

	if (!raw || raw.length === 0) return null;

	return (
		<div className='relative container-default'>
			<FilterDrawer
				key={`drawer-${lang}`}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				searchText={searchText}
				setSearchText={setSearchText}
				facetsCats={facetsCats}
				facetsTypes={facetsTypes}
				selectedCats={selectedCats}
				selectedTypes={selectedTypes}
				toggleCat={toggleCat}
				toggleType={toggleType}
				clearAll={clearAll}
				visibleCount={filtered.length}
				availableCats={availableCats}
				availableTypes={availableTypes}
			/>

			<div className={isOpen ? 'with-drawer-padding' : 'without-drawer-padding'}>
				<div className='flex flex-col items-center'>
					<ul className={`grid grid-cols-1 ${isOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
						{filtered.map(ep => {
							const title = lang === 'pt' ? ep.titulo : ep.tituloEN;
							const chipsMain = lang === 'pt' ? ep.clusters2 : ep.clusters2_EN;
							const chipsList = Array.isArray(lang === 'pt' ? ep.clusters : ep.clustersEN) ? (lang === 'pt' ? ep.clusters : ep.clustersEN) : [];

							return (
								<li
									key={ep._id}
									onClick={() => setSelectedEp(ep)}
									className='border-[.5px] border-[#666566] hover:opacity-40 rounded-[15px]  transition duration-500 cursor-pointer h-full flex flex-col '
								>
									
									<img src={urlFor(ep.thumbnail).url()} alt={title} className='rounded-t-2xl w-full h-[250px] object-cover' />

									<div className='m-4 flex flex-col flex-grow '>
										<div className='flex justify-between text-sm opacity-80'>
											<span>{formatDateTimeLabel(ep.data , ep.horario, lang)}</span>
											{ep.duracao ? <span>{ep.duracao} min</span> : <span />}
										</div>

										{/* título */}
										<h2 className='mt-2'>{title}</h2>

										{/* chips */}
										<div className='mt-auto pt-12'>
											{chipsMain && <div className='inline-block px-2.5 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b] '>{chipsMain}</div>}

											<div className={`flex flex-wrap gap-2 ${chipsList.length ? 'mt-2' : ''}`}>
												{chipsList.map((c, i) => (
													<span key={i} className='inline-block px-2.5 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b]'>
														{c}
													</span>
												))}
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>

				<DrawerModal isOpen={!!selectedEp} onClose={() => setSelectedEp(null)} episode={selectedEp} />
			</div>
		</div>
	);
}
