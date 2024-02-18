import formatDate from '../util/formatDate';
import { unescape } from 'he';

const getComments = async (id) => {
	try {
		const response = await fetch(
			`https://blog-api-production-3581.up.railway.app/posts/${id}/comments`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok && response.status === 404)
			return { message: 'There are no comments' };

		const comments = await response.json();
		for (const comment of comments) {
			comment.author = unescape(comment.author);
			comment.message = unescape(comment.message);
			const formattedDate = formatDate(comment.createdAt);
			comment.createdAt = formattedDate;
		}

		return comments;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export default getComments;
