import { usePlayer } from '../context/PlayerContext';
import { useNowPlaying } from '../context/NowPlayingContext';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Player() {
	const { meta } = useNowPlaying();
	const { isPlaying, togglePlay, audioRef } = usePlayer();
	const [volumeHover, setVolumeHover] = useState(false);
	const [volume, setVolume] = useState(1);

	// Volume change
	const handleVolumeChange = e => {
		const newVolume = parseFloat(e.target.value);
		audioRef.current.volume = newVolume;
		setVolume(newVolume);
	};

	const toggleMute = () => {
		if (!audioRef.current) return;
		if (audioRef.current.volume > 0) {
			audioRef.current.volume = 0;
			setVolume(0);
		} else {
			audioRef.current.volume = 1;
			setVolume(1);
		}
	};

	return (
		<div className='border-[.5px] border-[#484848]  text-[#eaebde] rounded-2xl p-2 flex space-x-4  max-w-md relative'>
			{/* Cover */}
			{meta?.song.art ? (
				<img src={meta.song.art} alt='Album Art' className='w-30 h-30 rounded-lg object-cover' />
			) : (
				<div className='w-30 h-30 rounded-lg  flex items-center justify-center text-sm'>Offline</div>
			)}

			{/* Info + Controls */}
			<div className='  flex flex-col justify-between py-3'>
				<div>
					<p className='text-[#898989] text-sm mb-1 live-now'>Live stream</p>
					<p className='text-md truncate'>
						Now Playing: <span className='font-semibold'>{meta?.song.title || 'Offline...'}</span>{' '}
					</p>
				</div>

				<div className=' flex gap-4 '>
					{/* Play/Pause */}
					<button onClick={togglePlay} className='focus:outline-none'>
						{isPlaying ? <Pause className='w-8 h-8' stroke='#eaebde' fill='#eaebde' /> : <Play className='w-8 h-8' stroke='#eaebde' fill='#eaebde' />}
					</button>

					{/* Volume Control (hover reveal) */}
					<div className='relative  flex' onMouseEnter={() => setVolumeHover(true)} onMouseLeave={() => setVolumeHover(false)}>
						<button onClick={toggleMute}>{volume > 0 ? <Volume2 className='w-7 h-7' stroke='#eaebde' fill='#eaebde' /> : <VolumeX className='w-7 h-7' stroke='#eaebde' fill='#eaebde' />}</button>

						{/* Slider on hover */}
						<motion.input
							type='range'
							min='0'
							max='1'
							step='0.01'
							
							value={volume}
							onChange={handleVolumeChange}
							className='absolute top-3 left-12 w-24 h-1 bg-gray-400 rounded appearance-none cursor-pointer '
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: volumeHover ? 1 : 0, x: volumeHover ? 0 : -10 }}
							transition={{ duration: 0.2 }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
