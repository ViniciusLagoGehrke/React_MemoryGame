import React from 'react'
import { screen, render } from '@testing-library/react'
import CircularProgress from './CircularProgress'

describe('CircularProgress', () => {
  it('should render a CircularProgress with all its components', () => {
    render(<CircularProgress />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
