import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { act } from 'react-dom/test-utils';
import Comment from '../components/Comment';

describe('Comment', () => {
	const setup = () => {
		act(() => {
			render(<Comment comment={mockComment} />);
		});
	};

	const mockComment = {
		id: 1,
		author: 'John Doe',
		message: 'This is a very interesting blog!',
		createdAt: '1/10/2014',
	};

	it('renders comment author', () => {
		setup();

		const author = screen.getByText(mockComment.author);

		expect(author).toBeInTheDocument();
	});

	it('renders comment message', () => {
		setup();

		const message = screen.getByText(mockComment.message);
		expect(message).toBeInTheDocument();
	});

	it('renders comment date', () => {
		setup();

		const date = screen.getByText(mockComment.createdAt, { exact: false });
		expect(date).toBeInTheDocument();
	});
});
