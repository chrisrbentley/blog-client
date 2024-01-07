const formatDate = (date) => {
	const formatted = new Date(date).toLocaleDateString('en-US');
	return formatted;
};

export default formatDate;
