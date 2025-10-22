import { motion, useReducedMotion } from 'framer-motion';

export function LogoAnimated({ className = '' }) {
	const reduce = useReducedMotion();

	const AMP = 2.8; 
	const ROT = 0.9; 
	const SCL = 0.004; 

	const animate = reduce
		? {}
		: {
				x: [0, AMP, -AMP * 2.1, AMP * 0.3, 0],
				y: [0, -AMP, AMP * 0.5, -AMP * 0.2, 0],
				rotate: [0, ROT, -ROT * 0.5, ROT * 2.9, 0],
				scale: [1, 1 + SCL, 1, 1 + SCL * 0.6, 1],
		  };

	const transition = reduce ? {} : { duration: 7, repeat: Infinity, ease: 'easeInOut' };

	return (
		<motion.img
			src='/logos/logoBugio.svg'
			alt='Rádio Bugio Logo'
			className={`will-change-transform ${className}`}
			animate={animate}
			transition={transition}
			whileHover={{
				
				transition: { type: 'spring', stiffness: 120, damping: 12 },
			}}
			draggable='false'
		/>
	);
}
