import React, { useState } from "react";
import Header from "./Header";
import Board from "./Board";
import Card, { CardProps } from "./Card";
import ErrorMessage from "./ErrorMessage";
import CircularProgress from "./CircularProgress";
import useFetch from "../utils/useFetch";
import useWinner from "../utils/useWinner";

function Game() {
  const [gridSize, setGridSize] = useState<number>(5);
  const [loading, setLoading] = useState(true);
  const [flippedList, setFlippedList] = useState<number[]>([]);
  const [discoveredList, setDiscoveredList] = useState<number[]>([]);
  const [winner, setWinner] = useState(false);

  // fetch data and set initial-states
  const { cards } = useFetch(
    gridSize,
    setLoading,
    setFlippedList,
    setDiscoveredList
  );

  // Set winner when game is over
  useWinner(cards, discoveredList, setWinner);

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
      }, 1000);
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
    setLoading(true);
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
