import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { PortableText } from '@portabletext/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PortableComponents } from '../utils/PortableComponents.jsx';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ArchivePlayer } from './ArchivePlayer.jsx';

export function DrawerModalResearch({ doc, isOpen, onClose }) {
	const { lang } = useLanguage();

	// body scroll lock
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	// ESC fecha
	useEffect(() => {
		if (!isOpen) return;
		const onKey = e => e.key === 'Escape' && onClose?.();
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, onClose]);

	const title = useMemo(() => {
		if (!doc) return '';
		const t = (lang === 'pt' ? doc?.titulo : doc?.tituloEN) || doc?.titulo || doc?.tituloEN || '';
		return doc?.programa ? `${t}` : t;
	}, [doc, lang]);

	const descricaoBlocks = lang === 'pt' ? doc?.descricao : doc?.descricaoEN;
	const ficha = lang === 'pt' ? doc?.fichatecnica : doc?.fichatecnicaEN;

	const images = useMemo(() => {
		if (!Array.isArray(doc?.imagens)) return [];
		try {
			return doc.imagens.map(img => urlFor(img).url()).filter(Boolean);
		} catch {
			return [];
		}
	}, [doc]);

	const [idx, setIdx] = useState(0);
	useEffect(() => setIdx(0), [doc]);

	const isPrograma2 = Number(doc?.programa) === 2;

	const hasCarousel = images.length > 1;
	const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
	const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

	const onKey = useCallback(
		e => {
			if (!isOpen || !hasCarousel) return;
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		},
		[isOpen, hasCarousel, prev, next],
	);

	useEffect(() => {
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onKey]);

	if (!doc) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<motion.div className='fixed inset-0 bg-black/60 z-40' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

					{/* Drawer */}
					<motion.div
						key='drawer-research'
						className='fixed left-0 right-0 bottom-0 h-[75vh] lg:h-[85vh] border-t border-[#666566] bg-[#0f0f0f] text-white z-50 rounded-t-4xl p-6 lg:p-8 overflow-y-auto'
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.4 }}
						onClick={e => e.stopPropagation()}
						aria-modal='true'
						role='dialog'
					>
						<div className='grid grid-cols-2  gap-12'>
							<div className='text-[1.15rem] lg:text-[1.35rem] font-semibold text-[#eaebde] leading-[1.3]'>{title || (lang === 'pt' ? 'Sem título' : 'Untitled')}</div>
							<div className='text-right '>
								<button onClick={onClose} className='text-white hover:text-[#a7a7a7]' aria-label='Fechar'>
									{lang === 'pt' ? 'Fechar' : 'Close'}
								</button>
							</div>
						</div>

						<div className='flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-6'>
							{/* Col lateral: imagens/carrossel */}
							<div className='lg:col-span-6 order-2 lg:order-2 mb-6 lg:mb-0 '>
								{images.length > 0 ? (
									<div className='relative'>
										{/* imagem atual */}
										<motion.img
											key={idx}
											src={images[idx]}
											alt={`${title} – imagem ${idx + 1}`}
											className={`w-full ${isPrograma2 ? 'h-full' : 'h-[240px] lg:h-[500px]'} object-cover rounded-xl pointer-events-none select-none`}
											transition={{ duration: 0.25 }}
											draggable={false}
										/>

										{/* Controles */}
										{hasCarousel && (
											<>
												<button onClick={prev} className='absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70' aria-label='Imagem anterior'>
													<ChevronLeft className='w-5 h-5' />
												</button>
												<button onClick={next} className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70' aria-label='Imagem seguinte'>
													<ChevronRight className='w-5 h-5' />
												</button>

												{/* indicadores */}
												<div className='absolute bottom-2 left-0 right-0 flex justify-center gap-2'>
													{images.map((_, i) => (
														<span key={i} className={`w-2 h-2 rounded-full ${i === idx ? 'bg-[#eaebde]' : 'bg-white/40'}`} />
													))}
												</div>
											</>
										)}
									</div>
								) : null}
							</div>

							{/* Conteúdo principal */}
							<div className='lg:col-span-6 order-3 lg:order-1 '>
								{descricaoBlocks ? (
									<div className=' text-sm lg:text-[1rem] text-[#eaebde]'>
										<PortableText value={descricaoBlocks} components={PortableComponents} />
									</div>
								) : (
									<div className='mt-4 text-sm opacity-60'>{lang === 'pt' ? 'Sem descrição disponível.' : 'No description available.'}</div>
								)}
							</div>

							{/* Meta + ficha técnica + áudio */}

							<div className='lg:col-span-12 order-4 mt-6'>
								{/* Ficha técnica */}
								{Array.isArray(ficha) && ficha.length > 0 && (
									<div className='border-t border-[#333] pt-4'>
										<div className='text-sm uppercase tracking-wide opacity-80 mb-2'>{lang === 'pt' ? 'Ficha técnica' : 'Credits'}</div>
										<ul className='space-y-1 text-sm text-[#e1e1e1]'>
											{ficha.map((p, i) => (
												<li key={i}>
													<span className='font-medium'>{p?.nome}</span>
													{p?.funcao ? <span className='opacity-80'> — {p.funcao}</span> : null}
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Áudio (opcional) */}
								{doc?.archiveAudioUrl ? (
									<div className='border-t border-[#333] pt-4 mt-4'>
										<ArchivePlayer src={doc.archiveAudioUrl} />
									</div>
								) : null}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
