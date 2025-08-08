import { createContext, useContext, useEffect, useRef, useState } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		// Criar audio só no mount
		audioRef.current = new Audio('https://azuracast-tiwnu-u49648.vm.elestio.app/listen/radio_estacao_do_bugio/stream');
		audioRef.current.preload = 'none';

		const updateTime = () => setCurrentTime(audioRef.current.currentTime || 0);
		const updateDuration = () => setDuration(audioRef.current.duration || 0);

		audioRef.current.addEventListener('timeupdate', updateTime);
		audioRef.current.addEventListener('loadedmetadata', updateDuration);

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = '';
				audioRef.current.removeEventListener('timeupdate', updateTime);
				audioRef.current.removeEventListener('loadedmetadata', updateDuration);
				audioRef.current = null;
			}
		};
	}, []);

	const togglePlay = () => {
		if (!audioRef.current) return;
		if (audioRef.current.paused) {
			audioRef.current.play().catch(e => {
				// Safari pode bloquear o autoplay sem interação
				console.log('Erro ao dar play no Safari:', e);
			});
			setIsPlaying(true);
		} else {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	const toggleMute = () => {
		if (!audioRef.current) return;
		audioRef.current.muted = !audioRef.current.muted;
		setIsMuted(audioRef.current.muted);
	};

	// Ajusta volume direto pelo ref
	const setVolume = v => {
		if (audioRef.current) {
			audioRef.current.volume = v;
			setIsMuted(audioRef.current.muted);
		}
	};

	return (
		<PlayerContext.Provider
			value={{
				audioRef,
				isPlaying,
				currentTime,
				duration,
				toggleMute,
				isMuted,
				togglePlay,
				setVolume,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
}

export function usePlayer() {
	return useContext(PlayerContext);
}
