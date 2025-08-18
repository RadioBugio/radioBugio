import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

function formatTime(s) {
	if (!isFinite(s)) return '0:00';
	const m = Math.floor(s / 60);
	const ss = Math.floor(s % 60)
		.toString()
		.padStart(2, '0');
	return `${m}:${ss}`;
}

export function ArchivePlayer({ src, onPlayStart, className = '' }) {
	const audioRef = useRef(null);
	const [playing, setPlaying] = useState(false);
	const [t, setT] = useState(0);
	const [dur, setDur] = useState(0);
	

	useEffect(() => {
		const a = audioRef.current;
		if (!a) return;
		const onTime = () => setT(a.currentTime || 0);
		const onMeta = () => setDur(a.duration || 0);
		const onEnd = () => setPlaying(false);

		a.addEventListener('timeupdate', onTime);
		a.addEventListener('loadedmetadata', onMeta);
		a.addEventListener('ended', onEnd);
		return () => {
			a.removeEventListener('timeupdate', onTime);
			a.removeEventListener('loadedmetadata', onMeta);
			a.removeEventListener('ended', onEnd);
		};
	}, []);

	const toggle = async () => {
		const a = audioRef.current;
		if (!a) return;
		if (a.paused) {
			onPlayStart?.(); // pausa o Live
			try {
				await a.play();
				setPlaying(true);
			} catch {}
		} else {
			a.pause();
			setPlaying(false);
		}
	};

	const seek = e => {
		const v = Number(e.target.value);
		const a = audioRef.current;
		if (!a || !dur) return;
		a.currentTime = (v / 100) * dur;
		setT(a.currentTime);
	};



	return (
		<div className={`w-full border-[.5px] border-[#484848] p-4 text-sm rounded-xl ${className}`}>
			<audio ref={audioRef} src={src} preload='none' className='hidden' />

			<div className='group flex items-center gap-4'>
				<button onClick={toggle} className='text-[#eaebde] transition cursor-pointer ' aria-label='Play/Pause gravação'>
					{playing ? (
						<Pause className='w-5 h-5 stroke-[#eaebde] group-hover:stroke-[#484848] fill-[#eaebde] group-hover:fill-[#484848]' />
					) : (
						<Play className='w-5 h-5 stroke-[#eaebde] group-hover:stroke-[#484848] fill-[#eaebde] group-hover:fill-[#484848]' />
					)}
				</button>

				<input type='range' min='0' max='100' value={dur ? (t / dur) * 100 : 0} onChange={seek} className='flex-1 h-1 bg-[#484848] rounded-lg appearance-none cursor-pointer accent-[#eaebde]' />

				<div className='text-right text-[#aaa] '>
					{formatTime(t)} / {formatTime(dur)}
				</div>
			</div>
		</div>
	);
}
