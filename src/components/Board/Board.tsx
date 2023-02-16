import React from 'react'
import styled from 'styled-components'
import useWindowSize from '../../utils/useWindowSize'

export interface BoardProps {
  gridSize: number
  children?: JSX.Element | JSX.Element[]
}

const StyledBoard = styled.div<BoardProps & { cardSize: number }>`
  flex: 3 1 800px;
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: ${(props) =>
    `repeat(${props.gridSize}, clamp(4rem, ${props.cardSize}px, 300px))`};
  grid-template-rows: ${(props) =>
    `repeat(${props.gridSize}, clamp(4rem, ${props.cardSize}px, 300px))`};
  /* grid-auto-rows: auto; */
  gap: 1rem;
`

const Board = ({ gridSize, children }: BoardProps) => {
  const { height, width } = useWindowSize()
  const largestSize = height! > width! ? height : width
  const cardSize = largestSize! / gridSize
  return (
    <StyledBoard gridSize={gridSize} cardSize={cardSize} data-testid='board'>
      {children}
    </StyledBoard>
  )
}

export default Board
