import { useState, useEffect } from 'react'
import { Buoy } from '../types'

export function useBuoys() {
  const [data, setData] = useState<Buoy[]>([])
  const [daySelected, setDaySelected] = useState<number>(0)

  useEffect(() => {
    fetch('http://localhost:3005/buoys')
      .then((res) => res.json())
      .then((data) => setData(data as Buoy[]))
      .catch((err) => console.error('error:', err))
  }, [])

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
