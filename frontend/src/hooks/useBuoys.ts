import { useState, useEffect } from 'react'
import { formatedBuoys } from '../types'

type Props = {
  limit?: number
}

export function useBuoys({ limit = 6 }: Props) {
  const [buoy, setBuoy] = useState('2136')
  const [data, setData] = useState<formatedBuoys[]>([])

  const changeBuoy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBuoy(e.target.value)
  }

  const fetchBuoys = ({ limit, buoy }: { limit: number; buoy: string }) => {
    fetch(`http://localhost:3005/buoys?limit=${limit}&buoy=${buoy}`)
      .then((res) => res.json())
      .then((data) => setData(data as formatedBuoys[]))
      .catch((err) => console.error('error:', err))
  }

  useEffect(() => {
    fetchBuoys({ limit, buoy })
  }, [limit, buoy])

  return { data, changeBuoy }
}
