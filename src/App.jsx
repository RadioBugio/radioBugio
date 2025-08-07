import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
	return (
		<>
			<video id='bg-video' autoPlay loop muted playsInline>
				<source src='/bg.mp4' type='video/mp4' />O teu navegador não suporta vídeo em HTML5.
			</video>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
