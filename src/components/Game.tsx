import React, { useEffect, useState } from "react";
import Board from "./Board";
import Card from "./Card";
import { fetch } from "../service";

interface Props {
  gridSize?: number;
}

function Game({ gridSize = 5 }: Props) {
  const [cards, setCards] = useState<any>([]);

  useEffect(() => {
    fetch("/api/v2/imageIds", gridSize)
      .then((res) => {
        if (res.status === 200) {
          console.log("Success");
        } else if (res.status === 500) {
          console.log("Server Error");
        }

        return res.json();
      })
      .then((data) => {
        setCards(data);
      });
  }, [gridSize]);

  return (
    <Board>
      {cards.map((imageId: number, index: number) => (
        <Card key={index} gridSize={gridSize} imageId={imageId} />
      ))}
    </Board>
  );
}

export default Game;
