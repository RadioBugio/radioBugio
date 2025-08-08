import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes';
import { NowPlayingProvider } from './context/NowPlayingContext';
import { PlayerProvider } from './context/PlayerContext';
import { LanguageProvider } from './context/LanguageContext';


ReactDOM.createRoot(document.getElementById('root')).render(
	<LanguageProvider>
		<PlayerProvider>
			<NowPlayingProvider>
				<RouterProvider router={router} />
			</NowPlayingProvider>
		</PlayerProvider>
	</LanguageProvider>,
);
