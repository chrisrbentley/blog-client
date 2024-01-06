import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Preview from '../components/Preview';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('Preview', () => {
	it('should render entire contents of short posts', async () => {
		const shortPost = {
			author: 'John Doe',
			title: 'My cool react blog',
			contentHTML:
				'&lt;p&gt;vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet&lt;&#x2F;p&gt;',
		};

		act(() => {
			render(
				<BrowserRouter>
					<Preview post={shortPost} />
				</BrowserRouter>,
			);
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
			render(
				<BrowserRouter>
					<Preview post={longPost} />
				</BrowserRouter>,
			);
		});

		await waitFor(() => {
			const preview = screen.getByText(/facilisis...$/);
			expect(preview).toBeInTheDocument();
		});
	});

	it('should render formatted date', async () => {
		const post = {
			author: 'John Doe',
			title: 'My cool react blog',
			contentHTML:
				'&lt;p&gt;vel risus commodo est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet&lt;&#x2F;p&gt;',
			publishedAt: '2023-12-26T19:00:32.731Z',
		};

		act(() => {
			render(
				<BrowserRouter>
					<Preview post={post} />
				</BrowserRouter>,
			);
		});

		await waitFor(() => {
			const date = screen.getByText('12/26/2023');
			expect(date).toBeInTheDocument();
		});
	});
});
