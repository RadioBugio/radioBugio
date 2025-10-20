import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home } from './pages/Home.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { Archive } from './pages/Archive.jsx';


export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				path: '/',
				element: <Home />,
			},
			{
				path: '/arquivo',
				element: <Archive />,
			},
			{
				path: '*',
				element: <ErrorPage />,
			},
		],
	},
]);
