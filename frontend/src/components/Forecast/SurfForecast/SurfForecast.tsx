import { useSurfForecast } from '../../../hooks/useForecast'
import { SurfForecast as SurfforecastType } from '../../../types'
import SurfForecastTable from './SurfForecastTable'
import SurfForecastResponsive from './SurfForecastResponsive'
import useWindowWidth from '../../../hooks/useWindowWidth'

export default function SurfForecast() {
  const width = useWindowWidth()

  const { data } = useSurfForecast({ limit: 44, page: 1 })

  const splitData = organizarPorDia(data)

  return (
    <>
      {width < 1368 ? (
        <SurfForecastResponsive data={data} />
      ) : (
        <div className='surf-forecast table-container'>
          <h1>Surf forecast</h1>
          <div className='tables'>
            {splitData.map((day) => (
              <SurfForecastTable data={day} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function organizarPorDia(elemento: SurfforecastType[]) {
  const sortedData = elemento.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year
    }
    if (a.month !== b.month) {
      return a.month - b.month
    }
    if (a.day !== b.day) {
      return a.day - b.day
    }
    return a.hour - b.hour
  })
  const elementsPerDay: { [key: number]: SurfforecastType[] } = {}

  sortedData.forEach((elemento) => {
    const dia = elemento.day

    if (!elementsPerDay[dia]) {
      elementsPerDay[dia] = []
    }

    elementsPerDay[dia].push(elemento)
  })

  const resultado = Object.values(elementsPerDay)

  return resultado
}
