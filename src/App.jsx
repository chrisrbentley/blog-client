import './App.css';
import Header from './components/Header';
import { getPosts } from './api/posts';
import { useEffect } from 'react';
import { useState } from 'react';
import Preview from './components/Preview';
import ReactLoading from 'react-loading';

function App() {
	const [posts, setPosts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const posts = await getPosts();
			const reversed = posts.reverse();
			setPosts(reversed);
		};
		fetchData();
	}, []);

	return posts ? (
		<>
			<Header />
			<main>
				<div className="previewContainer">
					{posts.map((post) => {
						return (
							<Preview
								key={post._id}
								post={post}
							/>
						);
					})}
				</div>
			</main>
		</>
	) : (
		<div className="loadingContainer">
			<ReactLoading
				type={'spinningBubbles'}
				color={'#000000'}
				height={'5%'}
				width={'5%'}
			/>
		</div>
	);
}

export default App;
