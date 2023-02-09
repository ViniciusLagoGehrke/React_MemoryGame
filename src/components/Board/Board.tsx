import styled from "styled-components";

interface Props {
  gridSize: number;
}

export default styled.div<Props>`
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
