import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const NowPlayingContext = createContext();

export function NowPlayingProvider({ children }) {
	const [meta, setMeta] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMeta = async () => {
			try {
				const res = await axios.get('https://azuracast-zrtyr-u49648.vm.elestio.app/api/nowplaying/radio_estacao_do_bugio');
				setMeta({
					song: res.data.now_playing.song,
					isOnline: res.data.is_online, 
				});
				setError(null);
			} catch (err) {
				console.error('Erro ao buscar metadata:', err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchMeta();
		const interval = setInterval(fetchMeta, 15000);
		return () => clearInterval(interval);
	}, []);

	return <NowPlayingContext.Provider value={{ meta, loading, error }}>{children}</NowPlayingContext.Provider>;
}

export function useNowPlaying() {
	return useContext(NowPlayingContext);
}
