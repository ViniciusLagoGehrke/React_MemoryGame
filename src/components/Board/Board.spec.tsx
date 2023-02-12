import React from "react";
import { screen, render } from "@testing-library/react";
import Board, { BoardProps } from "./Board";

const Props: BoardProps = {
  gridSize: 4
}

describe('Board', () => {
  it('should render a Board with correct props', () => {
    render(<Board {...Props} />);

    expect(screen.getByTestId('board')).toBeInTheDocument();
  });
})