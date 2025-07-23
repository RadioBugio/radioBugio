import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SmallPlayer } from '../components/SmallPlayer';

export function Header() {
	const [showMiniPlayer, setShowMiniPlayer] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const shouldShow = window.scrollY > window.innerHeight;
			setShowMiniPlayer(shouldShow);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToSection = id => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			{/* Gradiente no topo */}
			<div className='fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0f0f0f]/100 to-transparent z-40 pointer-events-none'></div>

			{/* Cabeçalho */}
			<div className='fixed top-0 left-0 w-full flex flex-col uppercase z-50 items-start p-3 text-lg '>
				<button className='text-left'>
					Rádio Estação <br />
					do Bugio
				</button>
				<div className='pt-3 flex flex-col text-sm items-start'>
					<button onClick={() => scrollToSection('programacao')} className='hover:underline'>
						PROGRAMAÇÃO
					</button>
					<button onClick={() => scrollToSection('arquivo')} className='hover:underline'>
						Arquivo
					</button>
					<button onClick={() => scrollToSection('sobre')} className='hover:underline'>
						Sobre
					</button>
				</div>
			</div>

			{/* Mini Player flutuante */}
			<div className='fixed bottom-4 left-3.5 z-50'>
				<AnimatePresence>
					{showMiniPlayer && (
						<motion.div
							key='small-player'
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className='flex items-center gap-3 bg-[#484848] text-black pl-4 text-sm shadow-black/30 rounded-2xl'
						>
							<p className='text-[#898989] text-sm live-now'>Live stream</p>
							<div className='border-l-1 py-2 px-4'>
								<SmallPlayer />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Gradiente no fundo */}
			<div className='fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0f0f0f]/100 to-transparent z-40 pointer-events-none'></div>
		</>
	);
}
