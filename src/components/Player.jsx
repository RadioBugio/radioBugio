import { usePlayer } from '../context/PlayerContext';
import { useNowPlaying } from '../context/NowPlayingContext';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';


function formatTime(seconds) {
	if (isNaN(seconds)) return '0:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60)
		.toString()
		.padStart(2, '0');
	return `${m}:${s}`;
}

export function Player() {
	const { isPlaying, togglePlay, audioRef, currentTime, isMuted, toggleMute, setVolume } = usePlayer();
	const [volumeHover, setVolumeHover] = useState(false);
	const { meta } = useNowPlaying();
	const [volume, setVol] = useState(1);

	const handleVolumeChange = e => {
		const v = parseFloat(e.target.value);
		setVol(v);
		setVolume(v);
	};

	const isOnline = meta?.isOnline;
	const songTitle = meta?.song?.title || '';

	return (
		<div className='border-[.5px] border-[#484848] text-[#eaebde] rounded-2xl p-2 flex space-x-4 relative'>
			<img src='/artcover.jpeg' alt='Radio bugio' className='w-35 h-40 rounded-lg object-cover border-[.5px] border-[#484848]' />
			<div className='flex flex-col justify-between py-3'>
				{isOnline ? (
					<>
						<p className='text-[#898989] text-sm mb-1'>Live stream</p>
						<div className='min-w-0'>
							<span className='inline-block font-semibold'>Agora: {songTitle}</span>
						</div>
						<p className='text-sm text-[#898989]'>{formatTime(currentTime)}</p>
					</>
				) : (
					<div className='text-sm font-semibold'>
						OFFLINE
						<br />
						Voltaremos em breve.
					</div>
				)}
				<div className='flex gap-4'>
					<button onClick={togglePlay} disabled={!isOnline} className={`focus:outline-none ${!isOnline ? 'opacity-40 cursor-not-allowed' : ''}`}>
						{isPlaying ? <Pause className='w-8 h-8' stroke='#eaebde' fill='#eaebde' /> : <Play className='w-8 h-8' stroke='#eaebde' fill='#eaebde' />}
					</button>

					<div className='relative  flex' onMouseEnter={() => setVolumeHover(true)} onMouseLeave={() => setVolumeHover(false)}>
						<button onClick={toggleMute}>{volume > 0 ? <Volume2 className='w-7 h-7' stroke='#eaebde' fill='#eaebde' /> : <VolumeX className='w-7 h-7' stroke='#eaebde' fill='#eaebde' />}</button>

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
