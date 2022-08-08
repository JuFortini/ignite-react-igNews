import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'my-fake-post',
  title: 'My Fake Post',
  content: 'My fake post content',
  updatedAt: '07 de agosto de 2022',
}

const session = {
  user: {
    name: 'John Doe',
    email: 'johndoe@example.com'
  },
  activeSubscription: 'fake-active-subscription',
  expires: 'fake-expires'
}

jest.mock('next-auth/react');
jest.mock('../../services/prismic');

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('My fake post content')).toBeInTheDocument();
  })

  it('redirects to homepage when user is not authenticated', async () => {
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({ params: { slug: 'my-fake-post' } } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/posts/preview/my-fake-post',
        })
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(session);

    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    const getByUIDPrismicClient = jest.fn();
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: getByUIDPrismicClient.mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My Fake Post' }
          ],
          content: [
            { type: 'paragraph', text: 'My fake post content' }
          ],
        },
        last_publication_date: '08-07-2022',
      })
    } as any);

    const response = await getServerSideProps({ params: { slug: 'my-fake-post' } } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-fake-post',
            title: 'My Fake Post',
            content: '<p>My fake post content</p>',
            updatedAt: '07 de agosto de 2022'
          }
        }
      })
    )
  })
})