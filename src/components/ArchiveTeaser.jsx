// src/components/ArchiveTeaser.jsx
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../SanityClient.js';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { DrawerModal } from './DrawerModal.jsx';

// helpers (iguais aos do Archive, só o necessário)
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

export function ArchiveTeaser() {
	const { lang } = useLanguage();
	const [items, setItems] = useState([]);
	const [selectedEp, setSelectedEp] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				// últimos 4 pela tua ordenação principal (programa descendente)
				const data = await sanityClient.fetch(`*[_type == "arquivo"] | order(programa desc) [0...4] {
          _id, programa, data, horario, ano,
          titulo, tituloEN, descricao, descricaoEN,
          clusters, clustersEN, clusters2, clusters2_EN,
          duracao, thumbnail, imagens[], archiveAudioUrl
        }`);
				setItems(data || []);
			} catch (err) {
				console.error('Erro ao buscar últimos arquivos:', err?.message);
			}
		})();
	}, []);

	if (!items.length) return null;

	return (
		<section className='relative py-12'>
			{/* conteúdo com overflow + fade no fundo */}
			<div className='container-default  relative overflow-hidden'>
				
                <div className='text-xl opacity-60  font-semibold text-center lg:text-left pb-6'>{lang === 'pt' ? 'Transmissções temporariamente em pausa. Últimos Episódios:' : 'Transmissions temporarily on pause. Last episodes:'}</div>

				<div className='flex flex-col items-center'>
					<ul className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6'>
						{items.map(ep => {
							const title = lang === 'pt' ? ep.titulo : ep.tituloEN;
							const chipsMain = lang === 'pt' ? ep.clusters2 : ep.clusters2_EN;
							const chipsList = Array.isArray(lang === 'pt' ? ep.clusters : ep.clustersEN) ? (lang === 'pt' ? ep.clusters : ep.clustersEN) : [];

							const cover = ep.thumbnail ? urlFor(ep.thumbnail).url() : null;

							return (
								<li
									key={ep._id}
									onClick={() => setSelectedEp(ep)}
									className='border-[.5px] border-[#666566] hover:opacity-40 rounded-[15px] transition duration-500 cursor-pointer h-full flex flex-col'
								>
									{cover && <img src={cover} alt={title} className='rounded-t-2xl w-full h-[250px] object-cover' />}

									<div className='m-4 flex flex-col flex-grow'>
										<div className='flex justify-between text-sm opacity-80'>
											<span>{formatDateTimeLabel(ep.data, ep.horario, lang)}</span>
											{ep.duracao ? <span>{ep.duracao} min</span> : <span />}
										</div>

										<h2 className='mt-2'>{title}</h2>

										<div className='mt-auto pt-12'>
											{chipsMain && <div className='inline-block px-2.5 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b]'>{chipsMain}</div>}

											{Array.isArray(chipsList) && chipsList.length > 0 && (
												<div className='flex flex-wrap gap-2 mt-2'>
													{chipsList.map((c, i) => (
														<span key={i} className='inline-block px-2.5 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b]'>
															{c}
														</span>
													))}
												</div>
											)}
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>

			{/* CTA “ver mais” fora do overflow para ficar visível */}
			<div className='flex justify-center mt-12'>
				<Link to='/arquivo' className='hover:opacity-50 transition duration-300'>
					{lang === 'pt' ? 'Ver Arquivo ' : 'See Archive '}
				</Link>
			</div>

			{/* Drawer (o mesmo do Archive) */}
			<DrawerModal episode={selectedEp} isOpen={!!selectedEp} onClose={() => setSelectedEp(null)} />
		</section>
	);
}
