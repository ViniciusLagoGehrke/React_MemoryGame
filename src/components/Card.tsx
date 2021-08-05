import React, { useState } from 'react';
import CardWrapper from './CardWrapper';
import CardImage from './CardImage';
import CardBack from './CardBack';

interface Props {
  gridSize: number;
  imageId: number;
}

export default function Card(props: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlipped = () => setIsFlipped(!isFlipped);

  return (
    <CardWrapper {...props} isFlipped={isFlipped} onClick={toggleFlipped}>
      <CardBack />
      <CardImage src={`https://picsum.photos/id/${props.imageId}/600`} alt={`${props.imageId}`} />
    </CardWrapper>
  );
}
