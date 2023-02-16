import { useState, useEffect } from 'react'
import { fetch } from '../service'
import { type CardProps } from '../components/Card/types'

interface FetchProps {
  gridSize: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setFlippedList: React.Dispatch<React.SetStateAction<number[]>>,
  setDiscoveredList: React.Dispatch<React.SetStateAction<number[]>>,
  setWinner: React.Dispatch<React.SetStateAction<boolean>>
};

const useFetch: (props: FetchProps) => {cards: CardProps[]} = ({
  gridSize,
  setLoading,
  setFlippedList,
  setDiscoveredList,
  setWinner,
}) => {
  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    let isMounted = true
    fetch('/api/v2/imageIds', gridSize)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else if (res.status === 500) {
          throw new Error('Server Error')
        }
      })
      .then((data) => {
        if (isMounted) {
          const initialCardList = data.map((item: number) => {
            return {
              gridSize,
              imageId: item,
              isFlipped: false
            }
          })
          setCards(initialCardList)
        }
      })
      .catch((error) => {
        setCards([])
        console.warn(error)
      })
      .finally(() => {
        setLoading(false)
        setFlippedList([])
        setDiscoveredList([])
        setWinner(false)
      })

    return () => {
      isMounted = false
    }
  }, [gridSize, setDiscoveredList, setFlippedList, setLoading, setWinner])

  return {
    cards
  }
}

export default useFetch
