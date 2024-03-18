import { useState, useEffect } from 'react'
import { SurfForecast } from '../types'

export function useSurfForecast({
  limit = 6,
  page = 1,
}: { limit?: number; page?: number } = {}) {
  const [data, setData] = useState<SurfForecast[]>([])

  const fetchSurfForecast = (page: number, limit: number) => {
    console.log('fetchSurfForecast')
    fetch(`http://localhost:3005/surf-forecast?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('error:', err))
  }

  useEffect(() => {
    fetchSurfForecast(page, limit)
  }, [page, limit])

  return { data }
}
