import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Blog from './Blog';

const Router = () => {
	const router = createBrowserRouter([
		{ path: '/', element: <App /> },
		{
			path: ':id',
			element: <Blog />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
