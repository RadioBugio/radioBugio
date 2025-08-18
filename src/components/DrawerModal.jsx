import React, { useEffect, useRef } from 'react';
import { PortableText } from '@portabletext/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import { Paragraph } from './Paragraph.jsx';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { useLanguage } from '../context/LanguageContext';
import { usePlayer } from '../context/PlayerContext';
import { ArchivePlayer } from './ArchivePlayer.jsx';

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

// helper para parar e libertar recursos do <audio>
function stopAndUnload(audioEl) {
	if (!audioEl) return;
	try {
		audioEl.pause();
		audioEl.currentTime = 0;
		audioEl.removeAttribute('src'); // evita downloads/buffer a ficarem em memória
		audioEl.load(); // força limpar o buffer/ligação
	} catch {}
}

export function DrawerModal({ episode, isOpen, onClose }) {
	const { lang } = useLanguage();
	const { isPlaying: liveIsPlaying, pause: pauseLive } = usePlayer();
	const archiveAudioRef = useRef(null);

	// trava/destrava scroll do body
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	// ESC fecha o drawer
	useEffect(() => {
		if (!isOpen) return;
		const onKey = e => {
			if (e.key === 'Escape') onClose?.();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, onClose]);

	// ao fechar o drawer, parar e descarregar a gravação
	useEffect(() => {
		if (!isOpen && archiveAudioRef.current) {
			stopAndUnload(archiveAudioRef.current);
		}
	}, [isOpen]);

	// ao desmontar, garantir que limpamos o áudio
	useEffect(() => {
		return () => stopAndUnload(archiveAudioRef.current);
	}, []);

	// se o Live começar a tocar → pausa a gravação
	useEffect(() => {
		if (liveIsPlaying && archiveAudioRef.current && !archiveAudioRef.current.paused) {
			archiveAudioRef.current.pause();
		}
	}, [liveIsPlaying]);

	// se a gravação começa a tocar → pausa o Live
	const handleArchivePlay = () => {
		pauseLive();
	};

	if (!episode) return null;

	const titulo = lang === 'pt' ? episode.titulo : episode.tituloEN;
	const descricao = lang === 'pt' ? episode.descricao : episode.descricaoEN;
	const clusters = lang === 'pt' ? episode.clusters : episode.clustersEN;
	const clusters2 = lang === 'pt' ? episode.clusters2 : episode.clusters2_EN;
	const duracao = episode.duracao;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<motion.div className='fixed inset-0 bg-black/60 z-40' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

					{/* Drawer */}
					<motion.div
						key='drawer'
						className='fixed left-0 right-0 bottom-0 h-[80vh] lg:h-[70vh] border-t border-[#484848] bg-[#0f0f0f] text-white z-50 rounded-t-4xl p-6 lg:p-8 overflow-y-auto'
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.4 }}
						// impedir que cliques dentro do drawer fechem pelo overlay
						onClick={e => e.stopPropagation()}
					>
						<div className='flex flex-col lg:grid lg:grid-cols-9 lg:gap-8'>
							{/* Coluna imagens */}
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

							{/* Conteúdo + meta */}
							<div className='col-span-6 flex flex-col lg:grid lg:grid-cols-6 gap-8 order-3 lg:order-2'>
								<div className='col-span-4 flex flex-col gap-4'>
									<div className='text-[1.1rem] font-semibold lg:text-[1.3rem] text-[#eaebde] leading-[1.3]'>{titulo}</div>

									<div className='lg:pt-8 text-sm lg:text-[1rem] text-[#eaebde]'>
										<PortableText
											value={descricao}
											components={{
												block: { normal: Paragraph },
											}}
										/>
									</div>
								</div>

								<div className='col-span-2'>
									<div className='text-sm text-[#eaebde] flex flex-col gap-1 mb-4'>
										<div>
											{episode.data?.dia}.{mesParaNumero(episode.data?.mes)}.{episode.data?.ano}
										</div>
										{duracao && (
											<div>
												{lang === 'pt' ? 'duração' : 'duration'}: {duracao} min
											</div>
										)}
									</div>

									{clusters2 && <div className='inline-block bg-[#92929256] px-2 py-0.5 lg:px-3 lg:py-1 text-[0.7rem] lg:text-xs rounded-full mb-2 text-[#eaebde]'>{clusters2}</div>}

									{Array.isArray(clusters) && (
										<div className='flex flex-wrap gap-2 mb-4'>
											{clusters.map((c, i) => (
												<div key={i} className='inline-block bg-[#92929256] px-2 py-0.5 lg:px-3 lg:py-1 text-[0.7rem] lg:text-xs rounded-full text-[#eaebde]'>
													{c}
												</div>
											))}
										</div>
									)}

									{episode.archiveAudioUrl && <ArchivePlayer src={episode.archiveAudioUrl} onPlayStart={handleArchivePlay} />}
								</div>
							</div>

							<div className='col-span-1 text-right order-1 lg:order-3 mb-3 lg:mb-0'>
								<button onClick={onClose} className='text-white text-xl hover:text-[#484848] cursor-pointer' aria-label='Fechar'>
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
