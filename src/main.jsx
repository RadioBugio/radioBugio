import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes';
import { NowPlayingProvider } from './context/NowPlayingContext';
import { PlayerProvider } from './context/PlayerContext';


ReactDOM.createRoot(document.getElementById('root')).render(
		<NowPlayingProvider>
			<PlayerProvider>
				<RouterProvider router={router} />
			</PlayerProvider>
		</NowPlayingProvider>
);
