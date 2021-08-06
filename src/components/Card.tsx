import React, { useEffect, useState } from "react";
import CardWrapper from "./CardWrapper";
import CardImage from "./CardImage";
import CardBack from "./CardBack";

export interface CardProps {
  gridSize: number;
  imageId: number;
  index: number;
  discoveredList: Array<number>;
  flippedList: Array<number>;
  onClick: () => void;
}

export default function Card(props: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (
      props.flippedList.includes(props.index) ||
      props.discoveredList.includes(props.index)
    ) {
      setIsFlipped(true);
    }
  }, [props.discoveredList, props.flippedList, props.index]);

  return (
    <CardWrapper
      gridSize={props.gridSize}
      isFlipped={isFlipped}
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
