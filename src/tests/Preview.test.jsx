import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Preview from '../components/Preview';
import { act } from 'react-dom/test-utils';

describe('Preview', () => {
	it('should render entire contents of short posts', async () => {
		const shortPost = {
			author: 'John Doe',
			title: 'My cool react blog',
			contentHTML:
				'&lt;p&gt;vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet&lt;&#x2F;p&gt;',
		};

		act(() => {
			render(<Preview post={shortPost} />);
		});

		await waitFor(() => {
			const title = screen.getByRole('heading', { name: shortPost.title });
			const preview = screen.getByText(
				'vel risus commodo viverra maecenas accumsan lacus vel',
				{
					exact: false,
				},
			);

			expect(title).toBeInTheDocument();
			expect(preview).toBeInTheDocument();
		});
	});

	it('should add ellipsis to end of long post', async () => {
		const longPost = {
			author: 'John Doe',
			title: 'My cool react blog',
			contentHTML:
				'&lt;p&gt;vel risus commodo viverra maecenas accumsan lacus accumsan lacus accumsan accumsan lacus accumsan lacus  lacus accumsan lacus accumsan lacus accumsan lacus accumsan lacus accumsan lacus  vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet&lt;&#x2F;p&gt;',
		};

		act(() => {
			render(<Preview post={longPost} />);
		});

		await waitFor(() => {
			const preview = screen.getByText(/facilisis...$/);
			expect(preview).toBeInTheDocument();
		});
	});
});