/* eslint-disable react/prop-types */
import { decode } from 'he';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Preview.module.css';
import formatDate from '../util/formatDate';

const Preview = ({ post }) => {
	const [preview, setPreview] = useState(null);
	const [formattedDate, setFormattedDate] = useState('');

	const getContentPreview = (content, maxLength = 200) => {
		const decoded = decode(content);

		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = decoded;

		const textContent = tempDiv.textContent || tempDiv.innerText;

		const truncatedContent =
			textContent && textContent.length > maxLength
				? textContent.substring(0, maxLength).trim() + '...'
				: textContent;

		setPreview(truncatedContent);
	};

	useEffect(() => {
		getContentPreview(post.contentHTML);
		const formatted = formatDate(post.publishedAt);
		setFormattedDate(formatted);
	}, [post.contentHTML, post.publishedAt]);

	return (
		<article className={styles.preview}>
			<div>
				<p className={styles.date}>{formattedDate}</p>
			</div>
			<Link to={post._id}>
				<h2>{post.title}</h2>
				<p>{preview}</p>
			</Link>
		</article>
	);
};

export default Preview;
