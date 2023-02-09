import React from "react";
import CardWrapper from "./CardWrapper";
import CardImage from "./CardImage";
import CardBack from "./CardBack";
import { CardProps } from "./types";

export default function Card({
  gridSize,
  isFlipped,
  onClick,
  imageId
}: CardProps) {
  return (
    <CardWrapper
      data-testid='card'
      gridSize={gridSize}
      isFlipped={isFlipped}
      onClick={onClick}
    >
      <CardBack />
      <CardImage
        src={`https://picsum.photos/id/${imageId}/600`}
        alt={`${imageId}`}
      />
    </CardWrapper>
  );
}