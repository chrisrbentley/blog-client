import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';
import getComments from '../api/getComments';

describe('Blog', () => {
	const mockGetPost = vi.fn();
	mockGetPost.mockReturnValue({
		id: 1,
		title: 'Mock Title',
		contentHTML:
			'&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor. Lorem ipsum dolor sit amet consectetur.&lt;/p&gt;',
	});

	const mockComments = [
		{
			id: 1,
			author: 'chris',
			message: 'cool post',
			createdAt: '1/10/2024',
		},
		{
			id: 2,
			author: 'john',
			message: 'dummy text',
			createdAt: '1/12/2024',
		},
	];

	vi.mock('../api/getComments');
	vi.mock('../api/postComment');

	it('should update number of remaining characters as user types message', async () => {
		const user = userEvent.setup();

		vi.mocked(getComments).mockResolvedValueOnce(mockComments);

		act(() => {
			render(<Blog getPost={mockGetPost} />);
		});

		await waitFor(async () => {
			const message = screen.getByRole('textbox', { name: /message/i });
			await user.type(message, 'Hello World!');
		});

		expect(screen.getByText(/remaining characters: 138/i));
	});

	it('should display comments', async () => {
		vi.mocked(getComments).mockResolvedValueOnce(mockComments);

		act(() => {
			render(<Blog getPost={mockGetPost} />);
		});

		await waitFor(() => {
			expect(screen.getByText(/chris/i)).toBeInTheDocument();
			expect(screen.getByText(/cool post/i)).toBeInTheDocument();

			expect(screen.getByText(/john/i)).toBeInTheDocument();
			expect(screen.getByText(/dummy text/i)).toBeInTheDocument();
		});
	});
});
