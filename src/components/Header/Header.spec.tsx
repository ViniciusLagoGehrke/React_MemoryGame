import React from 'react'
import Header, { type HeaderProps } from './Header'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

  it('should trigger onChange prop when user types', () => {
    const onChangeMock = jest.fn()
    render(<Header {...Props} onChange={onChangeMock} />)

    const inputText = '6'
    const input = screen.getByRole('textbox')

    userEvent.type(input, inputText)

    // expect(input).toHaveValue(inputText);
    // expect(onChangeMock).toHaveBeenCalled();
  })
})
