import { useEffect, useRef, useState } from 'react';
import styles from './CommentSection.module.css';
import ReactLoading from 'react-loading';

// eslint-disable-next-line react/prop-types
const CommentSection = ({ getComments, postComment, id }) => {
	const [comments, setComments] = useState(null);
	const [characterCount, setCharacterCount] = useState(150);
	const [loading, setLoading] = useState(false);

	const author = useRef();
	const message = useRef();

	useEffect(() => {
		const fetchData = async () => {
			const comments = await getComments(id);
			setComments(comments);
		};
		fetchData();
	}, [getComments, id]);

	const handleForm = async (e) => {
		e.preventDefault();
		const newAuthor = author.current.value;
		const newMessage = message.current.value;

		try {
			setLoading(true);
			const { success } = await postComment(id, newAuthor, newMessage);

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

	const handleCount = () => {
		const remaining = 150 - message.current.value.length;
		setCharacterCount(remaining);
	};

	return (
		<>
			<section className={styles.container}>
				<form
					onSubmit={handleForm}
					className={styles.form}
				>
					<fieldset>
						<legend>Leave a comment..</legend>
						<div className={styles.inputField}>
							<label htmlFor="author">Name</label>
							<input
								type="text"
								id="author"
								name="author"
								ref={author}
								required
							/>
						</div>
						<div className={styles.inputField}>
							<label htmlFor="message">Message</label>
							<textarea
								name="message"
								id="message"
								ref={message}
								cols="30"
								rows="5"
								onChange={handleCount}
								minLength={3}
								maxLength={150}
								aria-describedby="character-count"
								required
							/>
							<p id="character-count">Remaining characters: {characterCount}</p>
						</div>
					</fieldset>

					<button
						type="submit"
						className={styles.submit}
					>
						Submit
					</button>
				</form>

				<section>
					{loading && (
						<ReactLoading
							type={'spinningBubbles'}
							color={'#000000'}
							height={'5%'}
							width={'5%'}
						/>
					)}

					{comments &&
						(comments.message ? (
							<p>{comments.message}</p>
						) : (
							comments.map((comment) => {
								return (
									<div
										key={comment._id}
										className={styles.comment}
									>
										<div className={styles.commentTop}>
											<p className={styles.author}>{comment.author}</p>
											<p className={styles.date}>&#8729;{comment.createdAt}</p>
										</div>
										<p>{comment.message}</p>
									</div>
								);
							})
						))}
				</section>
			</section>
		</>
	);
};

export default CommentSection;
