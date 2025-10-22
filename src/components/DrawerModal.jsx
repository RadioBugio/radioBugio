// src/components/DrawerModal.jsx
import React, { useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import { Paragraph } from './Paragraph.jsx';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { useLanguage } from '../context/LanguageContext';
import { ArchivePlayer } from './ArchivePlayer.jsx';

// --- helpers de formatação (iguais ao Archive) ----------------
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
// --------------------------------------------------------------

export function DrawerModal({ episode, isOpen, onClose }) {
	const { lang } = useLanguage();

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		const onKey = e => e.key === 'Escape' && onClose?.();
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, onClose]);

	if (!episode) return null;

	const titulo = lang === 'pt' ? episode.titulo : episode.tituloEN;
	const descricao = lang === 'pt' ? episode.descricao : episode.descricaoEN;
	const clusters = lang === 'pt' ? episode.clusters : episode.clustersEN;
	const clusters2 = lang === 'pt' ? episode.clusters2 : episode.clusters2_EN;
	const duracao = episode.duracao;
	const dateTimeLabel = formatDateTimeLabel(episode.data, episode.horario, lang);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<motion.div className='fixed inset-0 bg-black/60 z-40' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

					{/* Drawer */}
					<motion.div
						key='drawer'
						className='fixed left-0 right-0 bottom-0 h-[73vh] lg:h-[85vh] border-t border-[#666566] bg-[#0f0f0f] text-white z-50 rounded-t-[1.5rem]  p-6 lg:p-8 overflow-y-auto'
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.4 }}
						onClick={e => e.stopPropagation()}
					>
						<div className='flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-6 lg:pb-12'>
							<div className='col-span-5 order-2 lg:order-0'>
								<h1>{titulo}</h1>
							</div>

							<div className='lg:text-right text-center'>
								<button
									onClick={onClose}
									className='inline-flex items-center gap-2 opacity-70  hover:opacity-50 transition duration-300 hover:text-[#bbbbbb] cursor-pointer'
									aria-label={lang === 'pt' ? 'Fechar' : 'Close'}
								>
									{lang === 'pt' ? 'Fechar' : 'Close'}
								</button>
							</div>
						</div>

						<div className='flex flex-col pt-4 lg:pt-0 lg:grid lg:grid-cols-12 lg:gap-12'>
							<div className='col-span-4  lg:mb-0'>
								{Array.isArray(episode.imagens) && episode.imagens.length > 0 && (
									<div className='flex flex-col gap-4'>
										{episode.imagens.map((img, idx) => (
											<img key={idx} src={urlFor(img).url()} alt={`${titulo} - imagem ${idx + 1}`} className='lg:w-full h-[200px] lg:h-full object-cover rounded-xl pointer-events-none' />
										))}
									</div>
								)}
							</div>
							<div className='col-span-8 flex flex-col lg:grid lg:grid-cols-6  gap-4 lg:gap-12 pt-4 lg:pt-0 '>
								<div className='col-span-4 flex flex-col gap-5 order-2 lg:order-0 '>
									<hr className='border-[#484848] lg:hidden block ' />
									<div className=' text-[#eaebde] '>
										<PortableText value={descricao} components={{ block: { normal: Paragraph } }} />
									</div>
								</div>

								<div className='col-span-2 order-1 lg:order-0  mb-1 lg:mb-0'>
									<div className='text-base text-[#eaebde] flex flex-col gap-1 mb-2 lg:mb-4'>
										{dateTimeLabel && (
											<div>
												{lang === 'pt' ? 'Data' : 'Date'}: {dateTimeLabel}
											</div>
										)}
										{duracao && (
											<div>
												{lang === 'pt' ? 'Duração' : 'Duration'}: {duracao} min
											</div>
										)}
									</div>

									{clusters2 && <div className='inline-block px-2 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b]  mb-1'>{clusters2}</div>}

									{Array.isArray(clusters) && clusters.length > 0 && (
										<div className='flex flex-wrap gap-1 '>
											{clusters.map((c, i) => (
												<div key={i} className='inline-block px-2 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b]'>
													{c}
												</div>
											))}
										</div>
									)}

									{episode.archiveAudioUrl && <ArchivePlayer src={episode.archiveAudioUrl} />}
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
