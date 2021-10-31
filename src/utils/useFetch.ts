import { useState, useEffect } from "react";
import { fetch } from "../service";
import { CardProps } from "../components/Card";

const useFetch = (
  gridSize: number,
  loading: boolean,
  toggleLoading: (loading: boolean) =>void,
  setFlippedList: React.Dispatch<React.SetStateAction<number[]>>,
  setDiscoveredList: React.Dispatch<React.SetStateAction<number[]>>,
  setWinner: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
  
  const [cards, setCards] = useState<CardProps[]>([]);

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
      .finally(() => {
        toggleLoading(loading);
        setFlippedList([]);
        setDiscoveredList([]);
        setWinner(false);
      });
  }, [gridSize, setDiscoveredList, setFlippedList, toggleLoading, setWinner, loading])

  return {
    cards
  }
};

export default useFetch;