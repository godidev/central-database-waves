import { useState, useEffect } from 'react'
import { formatedBuoys } from '../types'

type Props = {
  limit?: number
}

export function useBuoys({ limit = 6 }: Props) {
  const [data, setData] = useState<formatedBuoys[]>([])

  const fetchBuoys = ({ limit }: { limit: number }) => {
    fetch(`http://localhost:3005/buoys?limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setData(data as formatedBuoys[]))
      .catch((err) => console.error('error:', err))
  }

  useEffect(() => {
    fetchBuoys({ limit })
  }, [limit])

  return { data }
}
