import { usePlayer } from '../context/PlayerContext';
import { useNowPlaying } from '../context/NowPlayingContext';
import { Play, Pause } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function formatTime(seconds) {
	if (isNaN(seconds)) return '0:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60)
		.toString()
		.padStart(2, '0');
	return `${m}:${s}`;
}

export function SmallPlayer() {
	const { isPlaying, togglePlay, currentTime} = usePlayer();
	const { meta } = useNowPlaying();

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
			<div className='fixed bottom-4 left-8 z-50   '>
				<AnimatePresence>
					{showMiniPlayer && (
						<motion.div
							key='small-player'
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className='flex items-center border-[.5px] border-[#484848]  text-[#eaebde] bg-[#0f0f0f]  pl-4 text-sm shadow-black/30 rounded-xl'
						>
							<p className='text-[#898989] text-sm live-now pr-2'>Live </p>
							<div className='border-l-1 border-[#484848] py-2 px-4'>
								<div className='flex gap-5 items-center'>
									<button onClick={togglePlay} className='text-[#eaebde]transition'>
										{isPlaying ? <Pause className='w-4 h-4' stroke='#eaebde' fill='#eaebde' /> : <Play className='w-4 h-4' stroke='"eaebde"' fill='#eaebde' />}
									</button>

									<span className='truncate max-w-[250px] text-[#eaebde]'>{meta?.song.title || 'Offline'}</span>
									<span className='text-xs text-[#eaebde]'>{formatTime(currentTime)}</span>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className='fixed bottom-0 left-0 w-full h-30 bg-gradient-to-t from-[#0f0f0f]/100 to-transparent z-40 pointer-events-none'></div>
		</>
	);
}
