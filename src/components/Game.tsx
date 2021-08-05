import React, { useEffect, useState } from "react";
import Board from "./Board";
import Card from "./Card";
import { fetch } from "../service";

interface Props {
  gridSize?: number;
}

function Game({ gridSize = 5 }: Props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const setInitialCards = async () => {
      const response = await fetch("/api/v2/imageIds", 5);
      console.log(response);
      setCards(response.body as any);
    };
    setInitialCards();
  }, []);

  return (
    <Board>
      {/* {cards.map((imageId: number, index: number) => (
        <Card key={index} gridSize={gridSize} imageId={imageId} />
      ))} */}
    </Board>
  );
}

export default Game;
