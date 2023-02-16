import { useEffect } from 'react'
import { type CardProps } from '../components/Card/types'

const useWinner = (
  cards: CardProps[],
  discoveredList: number[],
  setWinner: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (discoveredList.length > 0 && discoveredList.length === cards.length) {
      setWinner(true)
    }
  }, [discoveredList, cards, setWinner])
}

export default useWinner
