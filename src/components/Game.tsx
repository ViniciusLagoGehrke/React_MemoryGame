import React, { useEffect, useState } from "react";
import Board from "./Board";
import Card from "./Card";
import ErrorMessage from "./ErrorMessage";
import CircularProgress from "./CircularProgress";
import { fetch } from "../service";

interface Props {
  gridSize?: number;
}

function Game({ gridSize = 5 }: Props) {
  const [cards, setCards] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v2/imageIds", gridSize)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 500) {
          throw new Error("Server Error");
        }
      })
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => setLoading(false));
  }, [gridSize]);

  function renderCards() {
    return cards.map((imageId: number, index: number) => (
      <Card key={index} gridSize={gridSize} imageId={imageId} />
    ));
  }

  return (
    <Board>
      {loading ? (
        <CircularProgress />
      ) : cards.length > 0 ? (
        renderCards()
      ) : (
        <ErrorMessage>Ops, something didn't work. Please refresh!</ErrorMessage>
      )}
    </Board>
  );
}

export default Game;
