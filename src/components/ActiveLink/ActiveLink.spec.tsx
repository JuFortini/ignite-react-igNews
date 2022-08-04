import { getByText, render } from '@testing-library/react';
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
    const { getByText } = render(
      <ActiveLink activeClassName='active' href="/">
        <a>Home</a>
      </ActiveLink>
    );
  
    expect(getByText('Home')).toBeInTheDocument();
  })
  
  it('adds active class as the link is the current path', () => {
    const { getByText } = render(
      <ActiveLink activeClassName='active' href="/">
        <a>Home</a>
      </ActiveLink>
    );
  
    expect(getByText('Home')).toHaveClass('active');
  })
})