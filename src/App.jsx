import './App.css';
import Header from './components/Header';
import { getPosts } from './api/posts';
import { useEffect } from 'react';
import { useState } from 'react';
import Preview from './components/Preview';

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const posts = await getPosts();
			setPosts(posts);
		};
		fetchData();
	}, []);

	return (
		<>
			<Header />
			<main>
				{posts.map((post) => {
					return (
						<Preview
							key={post._id}
							post={post}
						/>
					);
				})}
			</main>
		</>
	);
}

export default App;
