import React from "react";
import CardWrapper from "./CardWrapper";
import CardImage from "./CardImage";
import CardBack from "./CardBack";

export interface CardProps {
  gridSize: number;
  imageId: number;
  isFlipped: boolean;
  onClick: () => void;
}

export default function Card(props: CardProps) {
  return (
    <CardWrapper
      gridSize={props.gridSize}
      isFlipped={props.isFlipped}
      onClick={props.onClick}
    >
      <CardBack />
      <CardImage
        src={`https://picsum.photos/id/${props.imageId}/600`}
        alt={`${props.imageId}`}
      />
    </CardWrapper>
  );
}
