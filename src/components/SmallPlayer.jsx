import { usePlayer } from '../context/PlayerContext';
import { useNowPlaying } from '../context/NowPlayingContext';
import { Play, Pause } from 'lucide-react';

function formatTime(seconds) {
	if (isNaN(seconds)) return '0:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60)
		.toString()
		.padStart(2, '0');
	return `${m}:${s}`;
}

export function SmallPlayer() {
	const { isPlaying, togglePlay, currentTime, duration } = usePlayer();
	const { meta } = useNowPlaying();

	return (
		<div div className='flex gap-5 items-center'>
			<button onClick={togglePlay} className=' text-#eaebde  transition'>
				{isPlaying ? <Pause className='w-4 h-4' stroke='#eaebde' fill='#eaebde' /> : <Play className='w-4 h-4' stroke='#eaebde' fill='#eaebde' />}
			</button>

			<span className='truncate max-w-[250px] text-white'>{meta?.song.title || 'Loading...'}</span>
			<span className='text-xs text-gray-300'>{formatTime(currentTime)}</span>
		</div>
	);
}
