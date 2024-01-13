/* eslint-disable react/prop-types */
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
	return (
		<div className={styles.comment}>
			<div className={styles.commentTop}>
				<p className={styles.author}>{comment.author}</p>
				<p className={styles.date}>&#8729;{comment.createdAt}</p>
			</div>
			<p>{comment.message}</p>
		</div>
	);
};

export default Comment;
