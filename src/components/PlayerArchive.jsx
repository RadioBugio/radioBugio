import { useArchivePlayer } from '../context/ArchivePlayerContext';
import { Play, Pause } from 'lucide-react';

export function PlayerArchive({ audioUrl }) {
	const { playAudio, pause, isPlaying, currentAudio } = useArchivePlayer();

	const isThisPlaying = currentAudio === audioUrl && isPlaying;

	const handleClick = () => {
		if (isThisPlaying) pause();
		else playAudio(audioUrl);
	};

	return (
		<div className='fixed z-50 bottom-4 right-4 bg-[#0f0f0f] text-white p-4 rounded-xl shadow-md flex items-center gap-3'>
			<button onClick={handleClick}>{isThisPlaying ? <Pause className='w-6 h-6' /> : <Play className='w-6 h-6' />}</button>
			<span className='text-sm truncate max-w-[200px]'>Reproduzir áudio do arquivo</span>
		</div>
	);
}
