import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Blog from './Blog';
import { getPost } from '../api/posts';

const Router = () => {
	const router = createBrowserRouter([
		{ path: '/', element: <App /> },
		{
			path: ':id',
			element: <Blog getPost={getPost} />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
