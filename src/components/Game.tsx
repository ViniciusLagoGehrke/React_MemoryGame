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

  // Handle input change and set grid size
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputInteger = parseInt(event.currentTarget.value);
    if (inputInteger > 0) {
      setGridSize(inputInteger);
    }
  };

  // Handle click incrementing or decrementing grid size
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

  // fetch data and set initial-states
  const { cards } = useFetch(
    gridSize,
    setLoading,
    setFlippedList,
    setDiscoveredList,
    setWinner
  );

  // Maps data into cards
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

  // Check if clicked card is flipped or discovered and sets accordingly
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

  // Check if clicked card is already flipped or discovered and sets accordingly
  const handleFlipped = (index: number) => {
    // ignores if card is already discovered
    if (discoveredList.includes(index)) {
      return;
    }
    switch (flippedList.length) {
      case 0:
        // includes card in flippedList if there's no card flipped
        setFlippedList([index]);
        console.log("case 0");
        break;
      case 1:
        // includes second card on flippedList if not flipped already
        if (flippedList[0] !== index) {
          setFlippedList(flippedList.concat(index));
          checkCards(flippedList[0], index);
        }
        console.log("case 1");
        break;
      default:
        // clears the flippedList
        setFlippedList([]);
        console.log("case default");
    }
  };

  // Set winner when game is over
  useWinner(cards, discoveredList, setWinner);

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
