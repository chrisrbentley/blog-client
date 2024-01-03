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

export default getPosts;
