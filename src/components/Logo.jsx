import { useEffect, useState } from 'react';

export function Logo() {
	const perimeter = 314; // perímetro real da elipse
	const strokeLength = perimeter + 1; // +1 para esconder totalmente

	const [dashOffset, setDashOffset] = useState(strokeLength);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = Math.min(scrollTop / docHeight, 1);

			if (scrollTop === 0) {
				setDashOffset(strokeLength);
			} else {
				setDashOffset(strokeLength * (1 - scrollPercent));
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<svg className='fixed inset-0 w-full h-full pointer-events-none z-[1000]' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'>
			<g transform='rotate(-25 50 50)'>
				<ellipse cx='50' cy='50' rx='50' ry='50' fill='none' stroke='white' strokeWidth='0.04' strokeDasharray={strokeLength} strokeDashoffset={dashOffset} strokeLinecap='butt' />
			</g>
		</svg>
	);
}
