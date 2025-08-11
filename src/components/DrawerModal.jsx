import { useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { Paragraph } from './Paragraph.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function horaParaEnFormat(horaStr) {
	if (!horaStr) return '';
	const parts = horaStr.replace('h', ':').split(':');
	let horas = parseInt(parts[0], 10);
	let minutos = parts[1] ? parts[1].padStart(2, '0') : '00';
	const ampm = horas >= 12 ? 'pm' : 'am';
	horas = horas % 12;
	if (horas === 0) horas = 12;
	return minutos === '00' ? `${horas} ${ampm}` : `${horas}:${minutos} ${ampm}`;
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

export function DrawerModal({ episode, isOpen, onClose }) {
	const { lang } = useLanguage();

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);

	if (!episode) return null;

	const titulo = lang === 'pt' ? episode.titulo : episode.tituloEN;
	const descricao = lang === 'pt' ? episode.descricao : episode.descricaoEN;
	const clusters = lang === 'pt' ? episode.clusters : episode.clustersEN;
	const clusters2 = lang === 'pt' ? episode.clusters2 : episode.clusters2_EN;
	const horario = episode.horario;
	const duracao = episode.duracao;
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div className='fixed inset-0 bg-black/60 z-40' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

					<motion.div
						key='drawer'
						className='fixed left-0 right-0 bottom-0 
						h-[80vh] lg:h-[70vh] border-t border-[#484848] bg-[#0f0f0f] text-white z-50 rounded-t-4xl p-6 lg:p-8 overflow-y-auto '
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.4 }}
					>
						<div className='flex flex-col lg:grid lg:grid-cols-9 lg:gap-8'>
							<div className='col-span-2 order-2 lg:order-1 mb-6 lg:mb-0'>
								{Array.isArray(episode.imagens) && episode.imagens.length > 0 && (
									<div className='flex flex-col gap-4'>
										{episode.imagens.map((img, idx) => (
											<img
												key={idx}
												src={urlFor(img).url()}
												alt={`${titulo} - imagem ${idx + 1}`}
												className='lg:w-full h-[200px] lg:h-full object-cover rounded-xl border-[.5px] border-[#484848] pointer-events-none'
											/>
										))}
									</div>
								)}
							</div>
							<div className='col-span-6 flex flex-col lg:grid lg:grid-cols-6 gap-8 order-3 lg:order-2'>
								<div className='col-span-4 flex flex-col gap-4 '>
									<div className='text-[1.1rem] font-semibold  lg:text-[1.3rem] text-[#eaebde] leading-[1.3]'>{titulo}</div>

									<div className=' lg:pt-8 text-sm lg:text-[1rem]  text-[#eaebde] '>
										<PortableText
											value={descricao}
											components={{
												block: {
													normal: Paragraph,
												},
											}}
										/>
									</div>
								</div>
								<div className='col-span-2'>
									<div className='text-sm  text-[#eaebde] flex flex-col gap-1 mb-4'>
										<div>
											{episode.data?.dia}.{mesParaNumero(episode.data?.mes)}.{episode.data?.ano} 
										</div>

										<div>
											{' '}
											{duracao && (
												<p>
													{lang === 'pt' ? 'duração' : 'duration'}: {duracao} min
												</p>
											)}
										</div>
									</div>

									{clusters2 && <div className='inline-block bg-[#92929256] px-2 py-0.5 lg:px-3 lg:py-1 text-[0.7rem] lg:text-xs rounded-full mb-2  text-[#eaebde]'>{clusters2}</div>}

									{Array.isArray(clusters) && (
										<div className='flex flex-wrap gap-2 mb-4'>
											{clusters.map((c, i) => (
												<div key={i} className='inline-block bg-[#92929256] px-2 py-0.5 lg:px-3 lg:py-1 text-[0.7rem] lg:text-xs rounded-full  text-[#eaebde]'>
													{c}
												</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div className='col-span-1 text-right order-1 lg:order-3 mb-3 lg:mb-0'>
								<button onClick={onClose} className='text-white text-xl hover:text-red-400'>
									<X />
								</button>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
