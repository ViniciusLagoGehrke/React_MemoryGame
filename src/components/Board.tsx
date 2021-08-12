import styled from "styled-components";

interface Props {
  gridSize: number;
}

export default styled.div<Props>`
  width: 80%;
  height: 80%;
  display: grid;
  grid-template: ${(props) => `repeat(${props.gridSize}, 1fr)`} / ${(props) =>
      `repeat(${props.gridSize}, 1fr)`};
  gap: 1rem;
  @media (orientation: portrait) {
    width: 80vw;
    height: 80vw;
  }
`;
