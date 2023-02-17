import React from 'react'
import { screen, render } from '@testing-library/react'
import Header, { type HeaderProps } from './Header'

const Props: HeaderProps = {
  isWinner: false,
  gridSize: 4,
  onClick: () => {},
  onChange: () => {}
}

describe('Header', () => {
  it('should render a Header', () => {
    render(<Header {...Props} />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should contain a Header congratulation when there is a winner', () => {
    render(<Header {...Props} isWinner={true} />)

    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('should render input type text', () => {
    render(<Header {...Props} />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveProperty('type', 'text')
  })
})
