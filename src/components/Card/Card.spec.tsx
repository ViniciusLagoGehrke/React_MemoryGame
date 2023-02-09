import React from "react";
import { screen, render } from "@testing-library/react";
import Card from "./Card";
import { CardProps } from "./types";

const Props: CardProps = {
  gridSize: 4,
  isFlipped: false,
  onClick: ()=>{},
  imageId: 1,
}

describe('Card', () => {
  it('should render a Card', () => {
    render(<Card {...Props} />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });


})