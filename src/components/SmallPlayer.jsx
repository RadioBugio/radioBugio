import { usePlayer } from '../context/PlayerContext';
import { useNowPlaying } from '../context/NowPlayingContext';
import { Play, Pause } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Marquee } from './Marquee';
import { useLocation } from 'react-router-dom';

function formatTime(seconds) {
	if (isNaN(seconds)) return '0:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60)
		.toString()
		.padStart(2, '0');
	return `${m}:${s}`;
}

export function SmallPlayer() {
	const { isPlaying, togglePlay, currentTime } = usePlayer();
	const { meta } = useNowPlaying();
	const [showMiniPlayer, setShowMiniPlayer] = useState(false);
	const loc = useLocation();
	const isHome = loc.pathname === '/';

	useEffect(() => {
		const calcVisibility = () => {
			if (!isHome) {
				// fora da home: sempre visível
				setShowMiniPlayer(true);
				return;
			}
			// home: só após 50vh
			const threshold = window.innerHeight * 0.5;
			setShowMiniPlayer(window.scrollY > threshold);
		};

		// calcula já no mount/rota
		calcVisibility();

		// só precisa do listener na home
		if (isHome) {
			window.addEventListener('scroll', calcVisibility, { passive: true });
			return () => window.removeEventListener('scroll', calcVisibility);
		}
		return undefined;
	}, [isHome]);

	const isOnline = meta?.isOnline;

	return (
		<>
			<div className='fixed bottom-0 right-0 z-90 lg:flex'>
				<div className='pb-8 pl-4 pr-4 lg:pr-8'>
					<AnimatePresence>
						{isOnline && showMiniPlayer && (
							<motion.div
								key='small-player'
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className='flex items-center border-[.5px] border-[#484848] text-[#eaebde] bg-[#0f0f0f] pl-4 text-sm shadow-black/30 rounded-xl'
							>
								<p className='text-[#898989] text-sm live-now pr-2'>Live</p>
								<div className='border-l-1 border-[#484848] py-2 px-4'>
									<div className='flex gap-5 items-center'>
										<button onClick={togglePlay} className='text-[#eaebde] transition'>
											{isPlaying ? <Pause className='w-4 h-4' stroke='#eaebde' fill='#eaebde' /> : <Play className='w-4 h-4' stroke='#eaebde' fill='#eaebde' />}
										</button>

										<Marquee className='text-[#eaebde] max-w-[175px] lg:max-w-[250px]'>{meta?.song.title || 'Offline'}</Marquee>
										<span className='items-end-safe text-xs text-[#eaebde]'>{formatTime(currentTime)}</span>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			<div className='fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0f0f0f]/100 to-transparent z-30 pointer-events-none' />
		</>
	);
}
