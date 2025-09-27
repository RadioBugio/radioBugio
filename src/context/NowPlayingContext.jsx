// NowPlayingContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const NOWPLAYING_URL = 'https://azuracast-zrtyr-u49648.vm.elestio.app/api/nowplaying/radio_estacao_do_bugio';

const NowPlayingContext = createContext();

export function NowPlayingProvider({ children }) {
	const [meta, setMeta] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMeta = async () => {
			try {
				const res = await axios.get(NOWPLAYING_URL, { headers: { Accept: 'application/json' } });
				const d = res.data;

				const isOnline =
					Boolean(d?.is_online) ||
					Boolean(d?.live?.is_live) ||
					Boolean(d?.now_playing?.is_playing) ||
					// alguns retornam "playing" ou têm listeners>0 quando online
					Boolean(d?.playing) ||
					(typeof d?.listeners?.current === 'number' && d.listeners.current > 0);

				setMeta({
					song: d?.now_playing?.song || null,
					isOnline,
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
