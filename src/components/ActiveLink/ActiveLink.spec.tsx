import { render, screen } from '@testing-library/react';
import ActiveLink from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
  it('renders correctly', () =>  {
    render(
      <ActiveLink activeClassName='active' href="/">
        <a>Home</a>
      </ActiveLink>
    );
  
    expect(screen.getByText('Home')).toBeInTheDocument();
  })
  
  it('adds active class as the link is the current path', () => {
    render(
      <ActiveLink activeClassName='active' href="/">
        <a>Home</a>
      </ActiveLink>
    );
  
    expect(screen.getByText('Home')).toHaveClass('active');
  })
})