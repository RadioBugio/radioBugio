// src/components/DrawerModalResearch.jsx
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

	// imagens -> array de urls
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

	// ----------------- Download do "mapa" (apenas programa 2) -----------------
	const [downloading, setDownloading] = useState(false);

	const downloadFirstImage = async () => {
		if (!images?.[0]) return;
		try {
			setDownloading(true);
			const url = images[0];
			const res = await fetch(url, { credentials: 'omit' });
			const blob = await res.blob();
			const objUrl = URL.createObjectURL(blob);

			const ext = blob.type.split('/')[1] || 'jpg';
			const safeTitle = (title || 'mapa').replace(/[^\w\-]+/g, '_');
			const filename = `${safeTitle}.${ext}`;

			const a = document.createElement('a');
			a.href = objUrl;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(objUrl);
		} catch (e) {
			console.error('Falhou o download do mapa:', e);
			// fallback: abre em nova aba
			window.open(images[0], '_blank');
		} finally {
			setDownloading(false);
		}
	};
	// -------------------------------------------------------------------------

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
						<div className='flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-6 lg:pb-12'>
							<div className='col-span-5 order-2 lg:order-0'>
								<h1>{title}</h1>
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

								{/* Botão de download — só no programa 2 */}
								{isPrograma2 && images.length > 0 && (
									<div className='mt-3'>
										<button onClick={downloadFirstImage} disabled={downloading} className='hover:opacity-50 transition duration-300'>
											{downloading ? (lang === 'pt' ? 'A descarregar…' : 'Downloading…') : lang === 'pt' ? 'Download mapa aqui' : 'Download map here'}
										</button>
									</div>
								)}
							</div>

							{/* Conteúdo principal */}
							<div className='lg:col-span-6 order-3 lg:order-1 '>
								{descricaoBlocks ? (
									<div className=' text-sm lg:text-[1rem] text-[#eaebde]'>
										<PortableText value={descricaoBlocks} components={PortableComponents} />

										<div className=' pt-6'>
											{/* Ficha técnica */}
											{Array.isArray(ficha) && ficha.length > 0 && (
												<div className='border-t border-[#333] pt-4'>
													<div className='text-sm uppercase tracking-wide opacity-80 mb-2'>{lang === 'pt' ? 'Ficha técnica' : 'Credits'}</div>
													<ul className='space-y-1 text-sm text-[#e1e1e1]'>
														{ficha.map((p, i) => (
															<li className='flex flex-col pb-2' key={i}>
																{p?.funcao ? <span className='opacity-50'> {p.funcao}</span> : null}
																<span className='font-medium'>{p?.nome}</span>
															</li>
														))}
													</ul>
												</div>
											)}
										</div>
									</div>
								) : (
									<div className='mt-4 text-sm opacity-60'>{lang === 'pt' ? 'Sem descrição disponível.' : 'No description available.'}</div>
								)}
							</div>

							{/* Áudio (opcional) */}
							<div className='lg:col-span-12 order-4 mt-6'>
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
