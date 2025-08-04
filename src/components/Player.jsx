import { usePlayer } from '../context/PlayerContext';
import { useNowPlaying } from '../context/NowPlayingContext';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useArchivePlayer } from '../context/ArchivePlayerContext'; // <-- importante para pausar arquivos

function formatTime(seconds) {
	if (isNaN(seconds)) return '0:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60)
		.toString()
		.padStart(2, '0');
	return `${m}:${s}`;
}

export function Player() {
	const { meta } = useNowPlaying();
	const { isPlaying, togglePlay, audioRef, currentTime, toggleMute, isMuted } = usePlayer();
	const { pause: pauseArchive } = useArchivePlayer(); // <-- para parar arquivos se stream for tocado
	const [volumeHover, setVolumeHover] = useState(false);
	const [volume, setVolume] = useState(1);

	// Atualiza volume
	const handleVolumeChange = e => {
		const newVolume = parseFloat(e.target.value);
		audioRef.current.volume = newVolume;
		setVolume(newVolume);
	};

	const handlePlayToggle = () => {
		pauseArchive(); // <-- pausa o arquivo, se estiver a tocar
		togglePlay();
	};

	return (
		<div className='border-[.5px] border-[#484848] text-[#eaebde] rounded-2xl p-2 flex space-x-4 max-w-md relative'>
			{/* Imagem de capa ou Offline */}
			{meta?.song.art ? (
				<img src={meta.song.art} alt='Album Art' className='w-35 h-35 rounded-lg object-cover' />
			) : (
				<div className='w-35 h-35 rounded-lg bg-[#333] flex items-center justify-center text-sm'>Offline</div>
			)}

			{/* Info + Controles */}
			<div className='flex flex-col justify-between py-3'>
				<div>
					<p className='text-[#898989] text-sm mb-1 live-now'>Live stream</p>
					<p className='text-md truncate'>
						Now Playing: <span className='font-semibold'>{meta?.song.title || 'Offline...'}</span>
					</p>
					<p className='text-sm text-[#898989]'>{formatTime(currentTime)}</p>
				</div>

				<div className='flex gap-4 items-center'>
					{/* Play/Pause */}
					<button onClick={handlePlayToggle} className='focus:outline-none'>
						{isPlaying ? <Pause className='w-8 h-8' stroke='#eaebde' fill='#eaebde' /> : <Play className='w-8 h-8' stroke='#eaebde' fill='#eaebde' />}
					</button>

					{/* Volume */}
					<div className='relative flex items-center' onMouseEnter={() => setVolumeHover(true)} onMouseLeave={() => setVolumeHover(false)}>
						<button onClick={toggleMute}>
							{isMuted || volume === 0 ? <VolumeX className='w-7 h-7' stroke='#eaebde' fill='#eaebde' /> : <Volume2 className='w-7 h-7' stroke='#eaebde' fill='#eaebde' />}
						</button>

						<motion.input
							type='range'
							min='0'
							max='1'
							step='0.01'
							value={volume}
							onChange={handleVolumeChange}
							className='absolute top-3 left-12 w-24 h-1 bg-gray-400 rounded appearance-none cursor-pointer'
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
