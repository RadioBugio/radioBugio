// src/components/Schedule.jsx
import { useMemo, useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { DrawerModal } from './DrawerModal.jsx';

function mesParaNumero(mes) {
	const mapa = { Janeiro: '01', Fevereiro: '02', Março: '03', Abril: '04', Maio: '05', Junho: '06', Julho: '07', Agosto: '08', Setembro: '09', Outubro: '10', Novembro: '11', Dezembro: '12' };
	return mapa[mes] || '';
}

// Le com segurança (pode ser string "17:00" ou objeto {inicio:"17:00"})
function readHourField(h) {
	if (!h) return '';
	if (typeof h === 'string') return h;
	if (typeof h === 'object') return h.inicio || '';
	return '';
}
function horaParaEnFormat(horaStr) {
	if (!horaStr) return '';
	const parts = horaStr.replace('h', ':').split(':');
	let hh = parseInt(parts[0], 10);
	const mm = parts[1] ? parts[1].padStart(2, '0') : '00';
	const ampm = hh >= 12 ? 'pm' : 'am';
	hh = hh % 12;
	if (hh === 0) hh = 12;
	return mm === '00' ? `${hh} ${ampm}` : `${hh}:${mm} ${ampm}`;
}
function getHour(ep, lang) {
	if (lang === 'en') {
		const rawEn = readHourField(ep?.horarioEN);
		if (rawEn) return rawEn; // se tiveres um campo EN próprio, usa-o
		return horaParaEnFormat(readHourField(ep?.horario)); // fallback PT -> AM/PM
	}
	return readHourField(ep?.horario); // PT
}

function formatarDataHumana(dia, mesNome, ano, lang) {
	const meses = {
		pt: { Janeiro: 'Jan', Fevereiro: 'Fev', Março: 'Mar', Abril: 'Abr', Maio: 'Mai', Junho: 'Jun', Julho: 'Jul', Agosto: 'Ago', Setembro: 'Set', Outubro: 'Out', Novembro: 'Nov', Dezembro: 'Dez' },
		en: { Janeiro: 'Jan', Fevereiro: 'Feb', Março: 'Mar', Abril: 'Apr', Maio: 'May', Junho: 'Jun', Julho: 'Jul', Agosto: 'Aug', Setembro: 'Sep', Outubro: 'Oct', Novembro: 'Nov', Dezembro: 'Dec' },
	};
	const diasSemana = { pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
	const mesIndex = { Janeiro: 0, Fevereiro: 1, Março: 2, Abril: 3, Maio: 4, Junho: 5, Julho: 6, Agosto: 7, Setembro: 8, Outubro: 9, Novembro: 10, Dezembro: 11 }[mesNome];
	const dataEvento = new Date(ano, mesIndex, dia);

	const hoje = new Date();
	const amanha = new Date();
	amanha.setDate(hoje.getDate() + 1);
	const norm = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

	const ev = norm(dataEvento),
		h = norm(hoje),
		am = norm(amanha);
	let prefixo = diasSemana[lang][dataEvento.getDay()];
	if (ev.getTime() === h.getTime()) prefixo = lang === 'pt' ? 'Hoje' : 'Today';
	else if (ev.getTime() === am.getTime()) prefixo = lang === 'pt' ? 'Amanhã' : 'Tomorrow';

	return lang === 'en' ? `${prefixo}, ${meses.en[mesNome]} ${dia}` : `${prefixo}, ${dia} ${meses.pt[mesNome]}`;
}

export function Schedule({ entrevistas }) {
	const { lang } = useLanguage();
	const [selectedEp, setSelectedEp] = useState(null);
	const [open, setOpen] = useState(false);

	// agrupa por dia (para ter o header de data FORA das caixas)
	const grouped = useMemo(() => {
		const acc = {};
		for (const ep of entrevistas || []) {
			const key = `${ep.data?.dia}-${mesParaNumero(ep.data?.mes)}-${ep.data?.ano}`;
			if (!acc[key]) acc[key] = { label: formatarDataHumana(ep.data?.dia, ep.data?.mes, ep.data?.ano, lang), items: [] };
			acc[key].items.push(ep);
		}
		return acc;
	}, [entrevistas, lang]);

	if (!entrevistas || entrevistas.length === 0) {
		return (
			<>
				<hr className='border-[#484848]' />
				<div className='container-default text-[#eaebde]'>
					<div className='text-2xl font-bold'>{lang === 'pt' ? 'Programação' : 'Programming'}</div>
					<div className='text-lg font-semibold opacity-50'>{lang === 'pt' ? 'Nova programação em Outubro 2025' : 'New programming in October 2025'}</div>
				</div>
			</>
		);
	}

	return (
		<>
			<hr className='border-[#4c4c4b]' />

			<div className='m-[2rem] text-[#eaebde]'>
				

				{Object.entries(grouped).map(([key, group]) => (
					<section key={key} className='mt-6'>
						<h4 className='text-lg font-semibold mb-4'>{group.label}</h4>

						<ul className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
							{group.items.map(ep => {
								const cover = Array.isArray(ep.imagens) && ep.imagens[0] ? urlFor(ep.imagens[0]).url() : null;
								const hour = getHour(ep, lang);
								const title = lang === 'pt' ? ep.titulo : ep.tituloEN;
								const chipsMain = lang === 'pt' ? ep.clusters2 : ep.clusters2_EN;
								const chipsList = Array.isArray(lang === 'pt' ? ep.clusters : ep.clustersEN) ? (lang === 'pt' ? ep.clusters : ep.clustersEN) : [];

								return (
									<li
										key={ep._id}
										className='border-[.5px] border-[#666566] hover:opacity-40 rounded-[1.5rem]  transition duration-500 cursor-pointer h-full flex flex-col '
										onClick={() => {
											setSelectedEp(ep);
											setOpen(true);
										}}
									>
										{cover && <img src={cover} alt={title} className='w-full h-[250px] object-cover rounded-t-2xl' />}

										{/* corpo */}
										<div className='m-4 flex flex-col flex-grow '>
											{/* hora */}
											{hour && <div className='text-base opacity-80 mb-2'>{hour}</div>}

											{/* título */}
											<div className='text-[1.15rem] font-semibold leading-[1.3]'>{title}</div>

											{/* chips */}
											<div className='mt-auto pt-12'>
												{/* chip principal */}
												{chipsMain && (
													<div
														className={`inline-block px-2 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b] ${
															Array.isArray(chipsList) && chipsList.length > 0 ? 'mb-1' : ''
														}`}
													>
														{chipsMain}
													</div>
												)}

												{/* lista de chips — só renderiza se houver items */}
												{Array.isArray(chipsList) && chipsList.length > 0 && (
													<div className='flex flex-wrap gap-1 '>
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
					</section>
				))}
			</div>

			{/* Drawer reutilizado (o mesmo do Archive) */}
			<DrawerModal episode={selectedEp} isOpen={open} onClose={() => setOpen(false)} />
		</>
	);
}
