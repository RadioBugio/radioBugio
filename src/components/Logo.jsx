import { useEffect, useState } from 'react';

export function Logo() {
	// Cálculo aproximado do perímetro da elipse com rx = 90, ry = 40
	const rx = 90;
	const ry = 40;
	const perimeter = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
	const strokeLength = perimeter;

	const [dashOffset, setDashOffset] = useState(strokeLength);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = Math.min(scrollTop / docHeight, 1);

			setDashOffset(strokeLength * (1 - scrollPercent));
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [strokeLength]);

	return (
		<svg className='fixed inset-0 w-full h-full pointer-events-none z-[1000]' viewBox='0 0 200 200' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'>
			<g transform='rotate(-25 100 100)'>
				<ellipse cx='100' cy='100' rx={rx} ry={ry} fill='none' stroke='white' strokeWidth='0.07' strokeDasharray={strokeLength} strokeDashoffset={dashOffset} strokeLinecap='butt' />
			</g>
		</svg>
	);
}
