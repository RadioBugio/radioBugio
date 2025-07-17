import { usePlayer } from '../context/PlayerContext';
import { useNowPlaying } from '../context/NowPlayingContext';
import { Play, Pause } from 'lucide-react';

export function Player() {
	const { meta } = useNowPlaying();
	const { isPlaying, togglePlay } = usePlayer();

	return (
		<div className='bg-gray-800 text-white rounded-2xl p-4 flex items-center space-x-4 shadow-lg max-w-md mx-auto mt-8'>
			{meta?.song.art ? (
				<img src={meta.song.art} alt='Album Art' className='w-20 h-20 rounded-lg object-cover' />
			) : (
				<div className='w-20 h-20 rounded-lg bg-gray-600 flex items-center justify-center text-sm'>No Art</div>
			)}
			<div className='flex-1'>
				<p className='text-gray-400 text-sm'>Now Playing</p>
				<p className='font-semibold truncate'>{meta?.song.title || 'Loading...'}</p>
			</div>
			<button onClick={togglePlay} className='bg-white text-gray-800 rounded-full p-2 hover:bg-gray-300 transition'>
				{isPlaying ? <Pause className='w-5 h-5' /> : <Play className='w-5 h-5' />}
			</button>
		</div>
	);
}
