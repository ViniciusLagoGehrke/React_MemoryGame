import React, { useEffect, useState } from "react";
import Header from "./Header";
import Board from "./Board";
import Card, { CardProps } from "./Card";
import ErrorMessage from "./ErrorMessage";
import CircularProgress from "./CircularProgress";
import { fetch } from "../service";

function Game() {
  const [cards, setCards] = useState<any[]>([]);
  const [gridSize, setGridSize] = useState<number>(5);
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
        const initialCardList = data.map((item: number) => {
          return {
            gridSize: gridSize,
            imageId: item,
            isFlipped: false,
          };
        });
        setCards(initialCardList);
      })
      .catch((error) => {
        setCards([]);
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
    if (
      firstIndex !== secondIndex &&
      cards[firstIndex].imageId === cards[secondIndex].imageId
    ) {
      setDiscoveredList([...discoveredList, firstIndex, secondIndex]);
      setFlippedList([]);
    } else {
      setTimeout(() => {
        setFlippedList([]);
      }, 1200);
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputInteger = parseInt(event.currentTarget.value);
    if (inputInteger > 0) {
      setGridSize(inputInteger);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const shouldIncrement =
      event.currentTarget.dataset.shouldincrement === "true";
    if (shouldIncrement) {
      setGridSize(gridSize + 1);
    } else {
      setGridSize(gridSize - 1);
    }
  };

  const handleFlipped = (index: number) => {
    if (discoveredList.includes(index)) {
      return;
    }
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
  };

  function renderCards() {
    return cards.map((card: CardProps, index: number) => (
      <Card
        key={index}
        gridSize={card.gridSize}
        imageId={card.imageId}
        isFlipped={
          flippedList.includes(index) || discoveredList.includes(index)
        }
        onClick={() => handleFlipped(index)}
      />
    ));
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {cards && cards.length > 0 ? (
            <>
              <Header
                isWinner={winner}
                gridSize={gridSize}
                onClick={handleClick}
                onChange={handleChange}
              />
              <Board gridSize={gridSize}>{renderCards()}</Board>
            </>
          ) : (
            <ErrorMessage>
              Ops, something didn't work. Please refresh!
            </ErrorMessage>
          )}
        </>
      )}
    </>
  );
}

export default Game;
