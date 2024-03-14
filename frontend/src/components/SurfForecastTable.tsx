import { useSurfForecast } from '../hooks/useForecast'
import { SurfForecast } from '../types'
import Table from './Table'

export default function SurfForecastTable() {
  const limit = 48
  const { data } = useSurfForecast({ page: 1, limit })

  const splitData = organizarPorDia(data)

  return (
    <>
      <div className="forecast surf-forecast">
        <h1>Surf Forecast</h1>
        <div className="table-container">
          {splitData.map((day, index) => (
            <Table key={index} data={day} />
          ))}
        </div>
      </div>
    </>
  )
}

function organizarPorDia(elementos: SurfForecast[]) {
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
  const elementosPorDia: { [key: number]: SurfForecast[] } = {}

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
