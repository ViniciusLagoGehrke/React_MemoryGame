import { useEffect } from 'react'
import { type CardProps } from '../components/Card/types'

interface useWinnerProps {
  cards: CardProps[],
  discoveredList: number[],
  setWinner: React.Dispatch<React.SetStateAction<boolean>>
}
type UseWinner = (props: useWinnerProps) => void;

const useWinner: UseWinner = ({
  cards,
  discoveredList,
  setWinner
}) => {
  useEffect(() => {
    if (discoveredList.length > 0 && discoveredList.length === cards.length) {
      setWinner(true)
    }
  }, [discoveredList, cards, setWinner])
}

export default useWinner
