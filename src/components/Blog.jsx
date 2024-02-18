import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import styles from './Blog.module.css';
import getComments from '../api/getComments';
import postComment from '../api/postComment';
import Comment from './Comment';
import Form from './Form';
import { decode } from 'he';

// eslint-disable-next-line react/prop-types
const Blog = ({ getPost }) => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(false);
	const [comments, setComments] = useState(null);
	const formRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			const post = await getPost(id);
			console.log(post);

			const decodedContent = decode(post.contentHTML);

			post.contentHTML = decodedContent;
			setPost(post);

			const comments = await getComments(id);

			setComments(comments);
		};

		fetchData();
	}, [getPost, id]);

	const handleForm = async (e) => {
		e.preventDefault();
		const authorValue = formRef.current.getAuthorValue();
		const messageValue = formRef.current.getMessageValue();

		try {
			setLoading(true);
			const { success } = await postComment(id, authorValue, messageValue);

			if (!success) {
				return console.error('Could not post comment.');
			}

			const comments = await getComments(id);
			setComments(comments);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{post ? (
				<main className={styles.main}>
					<div className={styles.container}>
						<article className={styles.blog}>
							<h1>{post.title}</h1>
							<p>{post.publishedAt}</p>
							<div dangerouslySetInnerHTML={{ __html: post.contentHTML }}></div>
						</article>
						<Form
							handleForm={handleForm}
							ref={formRef}
							loading={loading}
						/>
						<section className={styles.commentsContainer}>
							{loading && (
								<ReactLoading
									type={'spinningBubbles'}
									color={'#000000'}
									height={'5%'}
									width={'5%'}
									className={styles.loader}
								/>
							)}
							{comments &&
								(comments.message ? (
									<p>{comments.message}</p>
								) : (
									comments.map((comment) => {
										return (
											<Comment
												key={comment._id}
												comment={comment}
											/>
										);
									})
								))}
						</section>
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
