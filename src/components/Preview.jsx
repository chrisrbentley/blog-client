/* eslint-disable react/prop-types */
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';

const Preview = ({ post }) => {
	const [preview, setPreview] = useState(null);

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
	}, [post.contentHTML]);

	/* useEffect(() => {
		getContentPreview(post.content);
	}, [post.content]); */

	return (
		<section>
			<h2>{post.title}</h2>
			<p>{preview}</p>
		</section>
	);
};

export default Preview;
