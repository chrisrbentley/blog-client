import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decode } from 'html-entities';
import ReactLoading from 'react-loading';
import styles from './Blog.module.css';
import formatDate from '../util/formatDate';
import CommentSection from './CommentSection';
import getComments from '../api/getComments';
import postComment from '../api/postComment';

// eslint-disable-next-line react/prop-types
const Blog = ({ getPost }) => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [formattedDate, setFormattedDate] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const post = await getPost(id);

			const decodedContent = decode(post.contentHTML);
			post.contentHTML = decodedContent;

			console.log(post);
			setPost(post);

			const formatted = formatDate(post.publishedAt);
			setFormattedDate(formatted);
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
							<p>{formattedDate}</p>
							<div dangerouslySetInnerHTML={{ __html: post.contentHTML }}></div>
						</article>
					</div>
					<CommentSection
						getComments={getComments}
						postComment={postComment}
						id={id}
					/>
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
