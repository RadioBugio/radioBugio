import { usePlayer } from '../context/PlayerContext';
import { useNowPlaying } from '../context/NowPlayingContext';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export function Player() {
	const { meta } = useNowPlaying();
	const { isPlaying, togglePlay, currentTime, duration, toggleMute, isMuted } = usePlayer();

	const progressBarRef = useRef(null);
	const [hoverTime, setHoverTime] = useState(null);

	const formatTime = seconds => {
		if (isNaN(seconds)) return '0:00';
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60)
			.toString()
			.padStart(2, '0');
		return `${minutes}:${secs}`;
	};

	const handleMouseMove = e => {
		if (!duration || !progressBarRef.current) return;
		const { left, width } = progressBarRef.current.getBoundingClientRect();
		const x = e.clientX - left;
		const percent = Math.min(Math.max(x / width, 0), 1);
		setHoverTime(percent * duration);
	};

	const handleMouseLeave = () => {
		setHoverTime(null);
	};

	const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

	return (
		<div className='border border-[#484848]  text-white rounded-2xl p-2 flex  gap-4  max-w-xl w-full'>
			{/* Art */}
			{meta?.song.art ? (
				<img src={meta.song.art} alt='Album Art' className='w-30 h-30 rounded-lg object-cover' />
			) : (
				<div className='w-16 h-16 rounded-lg border border-[#484848] flex items-center justify-center text-sm'>Offline</div>
			)}

			{/* Info & Controls */}
			<div className='flex-1'>
				<p className='text-gray-400 text-xs'>Live stream</p>
				<p className='font-semibold text-base truncate'>{meta?.song.title || 'Offline. Nova emissão em breve.'}</p>

				{/* Progress bar */}
				<div ref={progressBarRef} className='relative h-2 mt-2 bg-[#484848] rounded-full overflow-hidden group cursor-pointer' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
					<motion.div className='absolute top-0 left-0 h-full bg-amber-400' initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.2 }} />
					{/* Hover preview */}
					{hoverTime && (
						<div
							className='absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-1.5 py-0.5 rounded shadow pointer-events-none'
							style={{
								left: `${(hoverTime / duration) * 100}%`,
								transform: 'translateX(-50%)',
							}}
						>
							{formatTime(hoverTime)}
						</div>
					)}
				</div>

				<div className='flex justify-between text-xs text-[#484848] mt-1'>
					<span>{formatTime(currentTime)}</span>
					<span>{formatTime(duration)}</span>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<button onClick={togglePlay}>{isPlaying ? <Pause className='w-6 h-6' stroke='#eaebde' fill='#eaebde' /> : <Play className='w-6 h-6' stroke='#eaebde' fill='#eaebde' />}</button>
				<button onClick={toggleMute}>{isMuted ? <VolumeX className='w-5 h-5 text-white' /> : <Volume2 className='w-5 h-5 text-white' />}</button>
			</div>
		</div>
	);
}
