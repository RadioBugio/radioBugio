import { createContext, useContext, useEffect, useRef, useState } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
	const audioRef = useRef(new Audio('https://azuracast-tiwnu-u49648.vm.elestio.app/listen/radio_estacao_do_bugio/stream'));
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		const audio = audioRef.current;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);

		audio.addEventListener('timeupdate', updateTime);
		audio.addEventListener('loadedmetadata', updateDuration);

		return () => {
			audio.removeEventListener('timeupdate', updateTime);
			audio.removeEventListener('loadedmetadata', updateDuration);
		};
	}, []);

	const togglePlay = () => {
		if (!audioRef.current) return;
		if (audioRef.current.paused) {
			audioRef.current.play();
			setIsPlaying(true);
		} else {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	const toggleMute = () => {
		const audio = audioRef.current;
		audio.muted = !audio.muted;
		setIsMuted(audio.muted);
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
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
}

export function usePlayer() {
	return useContext(PlayerContext);
}
