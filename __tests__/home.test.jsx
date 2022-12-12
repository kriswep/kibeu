import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a paragraph', () => {
    render(<Home />)

    // const heading = screen.getByRole('heading')
    const paragraph = screen.getByText('Next.js',{exact:false})

    expect(paragraph).toBeInTheDocument()
  })
})