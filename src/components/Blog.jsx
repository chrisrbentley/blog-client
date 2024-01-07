import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decode } from 'html-entities';
import ReactLoading from 'react-loading';
import styles from './Blog.module.css';

// eslint-disable-next-line react/prop-types
const Blog = ({ getPost }) => {
	const { id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const posts = await getPost(id);
			const decodedContent = decode(posts.contentHTML);
			posts.contentHTML = decodedContent;
			console.log(posts);

			setPost(posts);
			console.log(posts);
		};
		fetchData();
	}, [getPost, id]);

	return (
		<>
			{post ? (
				<main className={styles.main}>
					<div className={styles.container}>
						<article className={styles.blog}>
							<h1>{post.title}</h1>
							<div dangerouslySetInnerHTML={{ __html: post.contentHTML }}></div>
						</article>
					</div>
				</main>
			) : (
				<div className={styles.loadingContainer}>
					<ReactLoading
						type={'spinningBubbles'}
						color={'#000000'}
						height={'5%'}
						width={'5%'}
					/>
				</div>
			)}
		</>
	);
};

export default Blog;
