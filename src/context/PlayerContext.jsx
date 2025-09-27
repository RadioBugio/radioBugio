import { createContext, useContext, useEffect, useRef, useState } from 'react';

const STREAM_URL = 'https://azuracast-zrtyr-u49648.vm.elestio.app/listen/radio_estacao_do_bugio/stream';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const [liveAvailable, setLiveAvailable] = useState(false);

	useEffect(() => {
		audioRef.current = new Audio(STREAM_URL);
		audioRef.current.preload = 'metadata';
		audioRef.current.crossOrigin = 'anonymous';

		const updateTime = () => setCurrentTime(audioRef.current.currentTime || 0);
		const updateDuration = () => setDuration(audioRef.current.duration || 0);
		const onCanPlay = () => setLiveAvailable(true);
		const onError = () => setLiveAvailable(false);

		audioRef.current.addEventListener('timeupdate', updateTime);
		audioRef.current.addEventListener('loadedmetadata', updateDuration);
		audioRef.current.addEventListener('canplay', onCanPlay);
		audioRef.current.addEventListener('loadedmetadata', onCanPlay);
		audioRef.current.addEventListener('error', onError);
		audioRef.current.addEventListener('stalled', onError);

		try {
			audioRef.current.load();
		} catch {}

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = '';
				audioRef.current.removeEventListener('timeupdate', updateTime);
				audioRef.current.removeEventListener('loadedmetadata', updateDuration);
				audioRef.current.removeEventListener('canplay', onCanPlay);
				audioRef.current.removeEventListener('error', onError);
				audioRef.current.removeEventListener('stalled', onError);
				audioRef.current = null;
			}
		};
	}, []);

	const togglePlay = () => {
		if (!audioRef.current) return;
		if (audioRef.current.paused) {
			audioRef.current.play().catch(e => console.log('Erro ao dar play:', e));
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

	const setVolume = v => {
		if (audioRef.current) {
			audioRef.current.volume = v;
			setIsMuted(audioRef.current.muted);
		}
	};

	const pause = () => {
		if (!audioRef.current) return;
		audioRef.current.pause();
		setIsPlaying(false);
	};

	return <PlayerContext.Provider value={{ audioRef, isPlaying, currentTime, duration, toggleMute, isMuted, togglePlay, setVolume, pause, liveAvailable }}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
	return useContext(PlayerContext);
}
