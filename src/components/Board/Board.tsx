import React from "react";
import styled from "styled-components";

export interface BoardProps {
  gridSize: number;
  children?: JSX.Element | JSX.Element[];
}

const StyledBoard = styled.div<BoardProps>`
  width: 80%;
  height: 80%;
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: ${(props) =>
    `repeat(${props.gridSize}, clamp(8rem, ${1 / props.gridSize}%, 300px))`};
  grid-template-rows: ${(props) =>
    `repeat(${props.gridSize}, clamp(8rem, ${1 / props.gridSize}%, 300px))`};
  /* grid-auto-rows: auto; */
  gap: 1rem;
  @media (orientation: portrait) {
    width: 80vw;
    height: 80vw;
  }
`;

const Board = ({ gridSize, children }: BoardProps ) => (
    <StyledBoard gridSize={gridSize} data-testid='board'>
      {children}
    </StyledBoard>
  );

export default Board;