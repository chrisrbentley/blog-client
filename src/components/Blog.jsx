import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decode } from 'html-entities';

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
			{post && (
				<article>
					<h1>{post.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: post.contentHTML }}></div>
				</article>
			)}
		</>
	);
};

export default Blog;
