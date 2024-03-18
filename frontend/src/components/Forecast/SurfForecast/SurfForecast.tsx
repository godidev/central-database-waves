import { useState, useEffect } from 'react'
import { useSurfForecast } from '../../../hooks/useForecast'
import { SurfForecast as SurfforecastType } from '../../../types'
import SurfForecastTable from './SurfForecastTable'
import SurfForecastResponsive from './SurfForecastResponsive'

export default function SurfForecast() {
  const [width, setWidth] = useState(window.innerWidth)

  const { data } = useSurfForecast({ limit: 48, page: 1 })

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const splitData = organizarPorDia(data)

  return (
    <>
      {width < 1368 ? (
        <SurfForecastResponsive data={data} />
      ) : (
        <div className="table-container">
          {splitData.map((day) => (
            <SurfForecastTable data={day} />
          ))}
        </div>
      )}
    </>
  )
}

function organizarPorDia(elementos: SurfforecastType[]) {
  // Crear un objeto para almacenar los elementos organizados por día
  const sortedData = elementos.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year
    }
    // Comparación por mes
    if (a.month !== b.month) {
      return a.month - b.month
    }
    // Comparación por día
    if (a.day !== b.day) {
      return a.day - b.day
    }
    // Comparación por hora
    return a.hour - b.hour
  })
  // Iterar sobre los elementos recibidos
  const elementosPorDia: { [key: number]: SurfforecastType[] } = {}

  sortedData.forEach((elemento) => {
    const dia = elemento.day

    // Si el día aún no está en el objeto, crear un array vacío para ese día
    if (!elementosPorDia[dia]) {
      elementosPorDia[dia] = []
    }

    // Agregar el elemento al array correspondiente al día
    elementosPorDia[dia].push(elemento)
  })

  // Convertir el objeto en un array de arrays
  const resultado = Object.values(elementosPorDia)

  return resultado
}
