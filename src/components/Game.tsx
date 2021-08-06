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
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [discoveredList, setDiscoveredList] = useState<number[]>([]);
  const [flippedList, setFlippedList] = useState<number[]>([]);
  const [winner, setWinner] = useState(false);

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

  useEffect(() => {
    if (discoveredList.length > 0 && discoveredList.length === cards.length) {
      setWinner(true);
    }
  }, [discoveredList, cards]);

  function checkCards(firstIndex: number, secondIndex: number) {
    console.log(flippedList);
    if (
      firstIndex !== secondIndex &&
      cards[firstIndex].imageId === cards[secondIndex].imageId
    ) {
      setDiscoveredList([...discoveredList, firstIndex, secondIndex]);
    } else {
      setTimeout(() => {
        setFlippedList([]);
      }, 600);
    }
  }

  const handleFlipped = (index: number) => {
    if (!discoveredList.includes(index)) {
      switch (flippedList.length) {
        case 0:
          setFlippedList([index]);
          break;
        case 1:
          if (flippedList[0] !== index) {
            setFlippedList(flippedList.concat(index));
            checkCards(flippedList[0], index);
          }
          break;
        case 2:
          setFlippedList([index]);
          break;
        default:
          setFlippedList([]);
      }
    }
  };

  function renderCards() {
    return cards.map((imageId: number, index: number) => (
      <Card
        key={index}
        gridSize={gridSize}
        imageId={imageId}
        index={index}
        discoveredList={discoveredList}
        flippedList={flippedList}
        onClick={() => handleFlipped(index)}
      />
    ));
  }

  return (
    <Board>
      {loading ? (
        <CircularProgress />
      ) : cards && cards.length > 0 ? (
        renderCards()
      ) : (
        <ErrorMessage>Ops, something didn't work. Please refresh!</ErrorMessage>
      )}
      {winner && <h1>Congratulations!!!</h1>}
    </Board>
  );
}

export default Game;
