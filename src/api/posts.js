import formatDate from '../util/formatDate';

const getPosts = async () => {
	try {
		const response = await fetch(
			'https://blog-api-production-3581.up.railway.app/posts/published-posts',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) return { message: 'Could not fetch posts' };

		return response.json();
	} catch (error) {
		console.log(error);
	}
};

const getPost = async (id) => {
	try {
		const response = await fetch(
			`https://blog-api-production-3581.up.railway.app/posts/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) return { message: 'Could not fetch posts' };

		const post = await response.json();
		post.publishedAt = formatDate(post.publishedAt);
		return post;
		/* const formattedDate = formatDate(post.publishedAt)
		return response.json(); */
	} catch (error) {
		console.log(error);
	}
};

export { getPosts, getPost };
