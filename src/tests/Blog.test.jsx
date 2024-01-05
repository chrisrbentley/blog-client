import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import Blog from '../components/Blog';

describe('Blog', () => {
	const mockGetPost = vi.fn();
	mockGetPost.mockReturnValue({
		id: 1,
		title: 'Mock Title',
		contentHTML:
			'&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor. Lorem ipsum dolor sit amet consectetur.&lt;/p&gt;',
	});

	it('should render blog title', async () => {
		act(() => {
			render(<Blog getPost={mockGetPost} />);
		});

		await waitFor(() => {
			const title = screen.getByRole('heading', { name: 'Mock Title' });
			expect(title).toBeInTheDocument();
		});
	});

	it('should render blog contents', async () => {
		act(() => {
			render(<Blog getPost={mockGetPost} />);
		});

		await waitFor(() => {
			const contentHTML = screen.getByText('Lorem ipsum dolor sit amet', {
				exact: false,
			});
			expect(contentHTML).toBeInTheDocument();
		});
	});
});
