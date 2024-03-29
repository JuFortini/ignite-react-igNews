import { render, screen } from "@testing-library/react"
import { Header } from "./Header"

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return {data: null, status: 'unauthenticated'}
    }
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <Header />
    )

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  })
})