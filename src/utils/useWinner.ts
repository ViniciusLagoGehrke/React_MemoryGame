import { useEffect } from "react";

const useWinner = (
  cards: any[],
  discoveredList: number[],
  setWinner: React.Dispatch<React.SetStateAction<boolean>>
) => {

  useEffect(() => {
    if (discoveredList.length > 0 && discoveredList.length === cards.length) {
      setWinner(true);
    }
  }, [discoveredList, cards, setWinner]);

}

export default useWinner;