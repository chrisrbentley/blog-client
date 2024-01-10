const postComment = async (id, author, message) => {
	try {
		const response = await fetch(
			`https://blog-api-production-3581.up.railway.app/posts/${id}/comments`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					author,
					message,
				}),
			},
		);

		if (!response.ok) {
			console.error(`Error ${response.status}: ${response.statusText}`);
			return { success: false };
		}

		return { success: true, response };
	} catch (error) {
		console.log(error);
		return error;
	}
};

export default postComment;
