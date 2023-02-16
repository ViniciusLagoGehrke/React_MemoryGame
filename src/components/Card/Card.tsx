import React from 'react'
import CardWrapper from './CardWrapper'
import CardImage from './CardImage'
import CardBack from './CardBack'
import { type CardProps } from './types'

const Card: React.FC<CardProps> =  ({
  gridSize,
  isFlipped,
  onClick,
  imageId
}: CardProps) => {
  return (
    <CardWrapper
      data-testid='card'
      gridSize={gridSize}
      isFlipped={isFlipped}
      onClick={onClick}
    >
      <CardBack data-testid='card-back'/>
      <CardImage
        src={`https://picsum.photos/id/${imageId}/600`}
        alt={`${imageId}`}
      />
    </CardWrapper>
  )
}

export default Card;