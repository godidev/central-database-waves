import { useState, useEffect } from 'react'
import { SurfForecast } from '../types'

export function useSurfForecast() {
  const [data, setData] = useState<SurfForecast[]>([])
  const [daySelected, setDaySelected] = useState<number>(0)

  useEffect(() => {
    fetch('http://localhost:3005/surf-forecast')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('error:', err))
  }, [])

  const orderedData = data.sort(compararRegistros)

  const uniqueDays = Array.from(
    new Set(orderedData.map((forecast) => forecast.day)),
  ).sort()

  const initialData = orderedData.filter(
    (forecast) => forecast.day === daySelected,
  )

  return { data, daySelected, setDaySelected, uniqueDays, initialData }
}

// Función de comparación
const compararRegistros = (a: SurfForecast, b: SurfForecast) =>
  a.year - b.year || a.month - b.month || a.day - b.day || a.hour - b.hour
