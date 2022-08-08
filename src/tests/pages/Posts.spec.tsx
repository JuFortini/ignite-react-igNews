import { render, screen } from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

const posts = [{
  slug: 'my-fake-post',
  title: 'My Fake Post',
  excerpt: 'my-fake-post-excerpt',
  updatedAt: '07 de agosto de 2022',
}]

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My Fake Post')).toBeInTheDocument();
  })

  it('loads initial data', async () => {
    const prismicClientMocked = jest.mocked(getPrismicClient);
    const queryPrismicClientMocked = jest.fn();
    prismicClientMocked.mockReturnValueOnce({
      query: queryPrismicClientMocked.mockResolvedValueOnce({
        results: [
          {
            uid: 'my-fake-post',
            data: {
              title: [
                { type: 'heading', text: 'My Fake Post' }
              ],
              content: [
                { type: 'paragraph', text: 'my-fake-post-excerpt' }
              ],
            },
            last_publication_date: '08-07-2022',
          }
        ]
      })
    } as any)

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: posts,
        }
      })
    )
  })
})