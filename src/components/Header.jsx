import React, { useEffect, useState } from 'react';
import { SmallPlayer } from './SmallPlayer';
import { AnimatePresence, motion } from 'framer-motion';

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

	return (
		<>
			<div className='fixed top-0 left-0 w-full flex flex-col font-bold uppercase z-50'>
				<div className='p-3 flex justify-between text-white'>
					<h1>Rádio Bugio</h1>
					<div>sobre</div>
				</div>
			</div>
			<div className='fixed bottom-4 left-3.5 z-50 '>
				<AnimatePresence>
					{showMiniPlayer && (
						<motion.div
							key='small-player'
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className=' flex items-center gap-3 bg-[#cecece] text-black pl-4  text-sm  shadow-black/30'
						>
							<div className='live-now uppercase font-bold'>no ar</div>
							<div className='  border-l-1 py-2 px-4 '>
								<SmallPlayer />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
