import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header1 } from './components/Header1';
import { Footer } from './components/Footer';

function App() {
	return (
		<>
			<Header1 />
			<Outlet />
		
			<Footer	/>
		</>
	);
}

export default App;
