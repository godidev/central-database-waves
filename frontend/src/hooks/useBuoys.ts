import { useState, useEffect } from 'react'
import { Buoy } from '../types'

type Props = {
  limit?: number
}

export function useBuoys({ limit }: Props) {
  const [data, setData] = useState<Buoy[]>([])
  const [daySelected, setDaySelected] = useState<number>(0)

  const fetchUrl = limit
    ? `http://localhost:3005/buoys?limit=${limit}`
    : 'http://localhost:3005/buoys'

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setData(data as Buoy[]))
      .catch((err) => console.error('error:', err))
  }, [fetchUrl])

  const orderedData = data.sort(compararRegistros)

  const uniqueDays = Array.from(
    new Set(orderedData.map((buoy) => buoy.day)),
  ).sort()

  const initialData = orderedData.filter((buoy) => buoy.day === daySelected)

  return { data, daySelected, setDaySelected, uniqueDays, initialData }
}

// Función de comparación
const compararRegistros = (a: Buoy, b: Buoy) =>
  a.year - b.year || a.month - b.month || a.day - b.day || a.hour - b.hour
