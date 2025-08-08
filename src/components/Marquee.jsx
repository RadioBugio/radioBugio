import { useRef, useEffect, useState } from 'react';

export function Marquee({ children, speed = 20, className = '', ...props }) {
	const containerRef = useRef(null);
	const textRef = useRef(null);
	const [shouldScroll, setShouldScroll] = useState(false);
	const [textWidth, setTextWidth] = useState(0);

	useEffect(() => {
		if (!containerRef.current || !textRef.current) return;
		const containerW = containerRef.current.offsetWidth;
		const textW = textRef.current.scrollWidth;
		setTextWidth(textW);
		setShouldScroll(textW > containerW);
	}, [children]);

	const animDuration = textWidth ? `${textWidth / speed}s` : '10s';

	return (
		<div ref={containerRef} className={`overflow-hidden whitespace-nowrap relative ${className}`} style={{ maxWidth: '175px', minHeight: 24 }} {...props}>
			{shouldScroll ? (
				<div
					style={{
						display: 'flex',
						width: textWidth * 2,
						animation: `marquee ${animDuration} linear infinite`,
					}}
				>
					<div ref={textRef} style={{ minWidth: textWidth }}>
						{children}
					</div>
					<div style={{ minWidth: textWidth }}>{children}</div>
				</div>
			) : (
				<div ref={textRef}>{children}</div>
			)}
		</div>
	);
}
