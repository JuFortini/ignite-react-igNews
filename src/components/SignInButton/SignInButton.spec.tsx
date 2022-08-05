import { render, screen } from '@testing-library/react';
import { debug } from 'console';
import { useSession } from 'next-auth/react';
import { SignInButton } from './SignInButton';

jest.mock('next-auth/react')

it('renders button correctly when user is not authenticated', () => {
  const useSessionMocked = jest.mocked(useSession);

  useSessionMocked.mockReturnValueOnce({
      data: null, 
      status: 'unauthenticated'
    })

  render(
    <SignInButton />
  )

  expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
})

describe('SignInButton component', () => {
  it ('renders button correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    const session = {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      },
      expires: 'fake expires',
    }
  
    useSessionMocked.mockReturnValueOnce({
      data: session,
      status: 'authenticated',
    })
  
    render(
      <SignInButton />
    )
  
    debug()
  
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  })
})