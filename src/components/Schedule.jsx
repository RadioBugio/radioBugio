import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { PortableText } from '@portabletext/react';
import { Paragraph } from './Paragraph.jsx';


export function Schedule({ entrevistas }) {
	const [expandedId, setExpandedId] = useState(null);

	const toggle = id => {
		setExpandedId(prev => (prev === id ? null : id));
	};

	if (!entrevistas || entrevistas.length === 0) return null;

	const grouped = entrevistas.reduce((acc, ep) => {
		const dateKey = `${ep.data?.dia}-${mesParaNumero(ep.data?.mes)}-${ep.data?.ano}`;
		if (!acc[dateKey]) acc[dateKey] = [];
		acc[dateKey].push(ep);
		return acc;
	}, {});

	return (
		<>
			<hr className='border-[#484848]' />
			<div className='text-[#eaebde] container-default '>
				<h2 className='text-2xl mb-6 font-bold uppercase'>PROGRAMAÇÃO</h2>
				<div className='flex flex-col items-center '>
					{Object.entries(grouped).map(([date, episodes]) => {
						const [dia, mesNum, ano] = date.split('-');
						const epExemplo = episodes[0];
						const mesNome = epExemplo?.data?.mes;

						return (
							<div key={date} className='mb-8 flex flex-col w-2/3  '>
								<div>
									<h3 className='text-xl font-semibold uppercase mb-4 opacity-50'>{formatarDataHumana(dia, mesNome, ano)}</h3>

									<ul className='flex flex-col gap-4 '>
										{episodes.map(ep => {
											const isOpen = expandedId === ep._id;

											return (
												<li key={ep._id} onClick={() => toggle(ep._id)} className='relative border-[.5px] border-[#484848] rounded-2xl p-3 transition duration-500 hover:bg-black cursor-pointer'>
													<div className='grid grid-cols-7 gap-8'>
														<div className='col-span-1 flex justify-between text-[1rem] opacity-80'>
															<span>{ep.horario?.inicio}</span>
														</div>
														<div className='col-span-3'>
															<h3 className='text-[1.2rem] text-[#eaebde] font-semibold'>{ep.titulo}</h3>
														</div>
														<div className='col-span-2'>
															<div className='flex flex-col '>
																<div>{ep.clusters2 && <div className='inline-block bg-[#92929256] px-3 py-1 text-xs opacity-80 rounded-full'>{ep.clusters2}</div>}</div>
																<div>
																	{Array.isArray(ep.clusters) &&
																		ep.clusters.map((cluster, index) => (
																			<div key={index} className='inline-block bg-[#48484856] px-3 py-1 mt-1 text-[0.7rem] opacity-80 rounded-full'>
																				{cluster}
																			</div>
																		))}
																</div>
															</div>
														</div>

														<div className='col-span-1 flex justify-end items-center pr-2'>
															<motion.div initial={false} animate={{ rotate: isOpen ? 90 : 180 }} transition={{ duration: 0.3 }}>
																<svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-[#eaebde]'>
																	<path
																		d='M8.12 4.71L13.41 10L8.12 15.29C7.73 15.68 7.73 16.31 8.12 16.7C8.51 17.09 9.14 17.09 9.53 16.7L15.53 10.7C15.92 10.31 15.92 9.68 15.53 9.29L9.53 3.29C9.14 2.9 8.51 2.9 8.12 3.29C7.73 3.68 7.73 4.31 8.12 4.71Z'
																		fill='currentColor'
																	/>
																</svg>
															</motion.div>
														</div>
													</div>

													<AnimatePresence initial={false}>
														{isOpen && (
															<motion.div
																initial={{ opacity: 0, height: 0 }}
																animate={{ opacity: 1, height: 'auto' }}
																exit={{ opacity: 0, height: 0 }}
																transition={{ duration: 0.3 }}
																className='overflow-hidden mt-12 text-sm text-gray-300 px-6 pb-6'
															>
																{Array.isArray(ep.imagens) && ep.imagens.length > 0 && (
																	<div className='grid grid-cols-3 gap-8 '>
																		<div>
																			{ep.imagens.map((img, idx) => (
																				<img key={idx} src={urlFor(img).url()} alt={`${ep.titulo} - imagem ${idx + 1}`} className='rounded-xl object-cover  w-full border-[.5px] border-[#484848]' />
																			))}
																		</div>
																		<div className='text-[1rem]  col-span-2'>
																			<p className=' opacity-50 font-semibold pb-2'>sínopse</p>
																			<PortableText
																				value={ep.descricao}
																				components={{
																					block: {
																						normal: Paragraph,
																					},
																				}}
																			/>
																		</div>
																	</div>
																)}
															</motion.div>
														)}
													</AnimatePresence>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

// 🔠 Traduz nomes dos meses para número
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

// 📆 Formata datas como "HOJE", "AMANHÃ" ou "QUA, 23 JUL"
function formatarDataHumana(dia, mesNome, ano) {
	const meses = {
		Janeiro: 'JAN',
		Fevereiro: 'FEV',
		Março: 'MAR',
		Abril: 'ABR',
		Maio: 'MAI',
		Junho: 'JUN',
		Julho: 'JUL',
		Agosto: 'AGO',
		Setembro: 'SET',
		Outubro: 'OUT',
		Novembro: 'NOV',
		Dezembro: 'DEZ',
	};

	const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

	const mesIndex = {
		Janeiro: 0,
		Fevereiro: 1,
		Março: 2,
		Abril: 3,
		Maio: 4,
		Junho: 5,
		Julho: 6,
		Agosto: 7,
		Setembro: 8,
		Outubro: 9,
		Novembro: 10,
		Dezembro: 11,
	}[mesNome];

	const dataEvento = new Date(ano, mesIndex, dia);
	const hoje = new Date();
	const amanha = new Date();
	amanha.setDate(hoje.getDate() + 1);

	const normalizar = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

	const eventoNormalizado = normalizar(dataEvento);
	const hojeNormalizado = normalizar(hoje);
	const amanhaNormalizado = normalizar(amanha);

	const prefixo = eventoNormalizado.getTime() === hojeNormalizado.getTime() ? 'HOJE' : eventoNormalizado.getTime() === amanhaNormalizado.getTime() ? 'AMANHÃ' : diasSemana[dataEvento.getDay()];

	return `${prefixo}, ${dia} ${meses[mesNome]}`;
}
