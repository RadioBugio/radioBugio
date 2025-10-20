import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Analytics } from '@vercel/analytics/react';



function App() {
	return (
		<>
			<div className='hidden lg:block'>
				<video id='bg-video' autoPlay loop muted playsInline preload='auto' webkit-playsinline='true' x5-playsinline='true'>
					<source src='/bg.mp4' type='video/mp4' />O teu navegador não suporta vídeo em HTML5.
				</video>
			</div>

			<Header />
			<Outlet />
			
			<Analytics />
		</>
	);
}

export default App;
