export function Video() {
	return (
		<>
			<div className='relative overflow-hidden h-[70vh]'>
				<video className='absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none  opacity-90' autoPlay loop muted playsInline>
					<source src='/IMG_9958 2-1.mp4' type='video/mp4' />
					Your browser does not support the video tag.
				</video>

				<div className='text-sm absolute bottom-2 right-8'>
					<p>© Francisco Nascimento (ITQB-NOVA, Oeiras)</p>
				</div>
			</div>
		</>
	);
}
