import { createContext, useContext, useRef, useState } from 'react';
import { usePlayer } from './PlayerContext';

const ArchivePlayerContext = createContext();

export function ArchivePlayerProvider({ children }) {
	const audioRef = useRef(new Audio());
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentAudio, setCurrentAudio] = useState(null);

	const { audioRef: liveAudioRef, setIsPlaying: setLivePlaying } = usePlayer();

	const playAudio = url => {
		// Pausar o live stream
		if (liveAudioRef.current) {
			liveAudioRef.current.pause();
			setLivePlaying(false);
		}

		// Se é outro áudio, troca
		if (audioRef.current.src !== url) {
			audioRef.current.src = url;
			setCurrentAudio(url);
		}

		audioRef.current.play();
		setIsPlaying(true);
	};

	const pause = () => {
		audioRef.current.pause();
		setIsPlaying(false);
	};

	return (
		<ArchivePlayerContext.Provider
			value={{
				audioRef,
				isPlaying,
				currentAudio,
				playAudio,
				pause,
			}}
		>
			{children}
		</ArchivePlayerContext.Provider>
	);
}

export const useArchivePlayer = () => useContext(ArchivePlayerContext);
