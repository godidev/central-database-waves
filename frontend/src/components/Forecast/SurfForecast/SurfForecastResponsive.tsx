import { SurfForecast } from '../../../types'

export default function SurfForecastResponsive({
  data,
}: {
  data: SurfForecast[]
}) {
  const { days, transformedData } = transformData(data)
  const headings = [
    ['Hora', ''],
    ['Altura', 'm'],
    ['Periodo', 's'],
    ['Energía', ''],
    ['Viento', 'm/s'],
    ['Letras', ''],
  ]

  return (
    <>
      <h1>Surf forecast</h1>
      <div className='responsive-table'>
        <table>
          <thead>
            <tr>
              <th>-</th>
              {days.map(([day, dayNumber]) => (
                <th key={dayNumber} colSpan={dayNumber} className='day'>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transformedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th>{headings[rowIndex][0]}</th>
                {row.map((cell, cellIndex) => {
                  if (rowIndex === 0) {
                    return (
                      <th key={rowIndex + cellIndex}>
                        {String(cell)}:00{headings[rowIndex][1]}
                      </th>
                    )
                  } else {
                    return (
                      <td
                        key={rowIndex + cellIndex + 1}
                        className={checkNewDay(days, cellIndex)}
                      >
                        {String(cell)}
                        {headings[rowIndex][1]}
                      </td>
                    )
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const checkNewDay = (
  days: Array<[string, number, number]>,
  cellIndex: number,
) => {
  if (days[0][2] === cellIndex || days[1][2] === cellIndex) {
    return 'newDay'
  }
  return ''
}

function transformData(data: SurfForecast[]) {
  const days: Array<[string, number, number]> = []
  const transformedData: Array<(number | string)[]> = new Array(6)
    .fill(null)
    .map(() => [])
  let prevDayCount = 0
  data.forEach((forecast, dayNumber) => {
    if (forecast.hour === 23 || dayNumber === data.length - 1) {
      dayNumber++
      days.push([
        forecast.year + '-' + forecast.month + '-' + forecast.day,
        dayNumber - prevDayCount,
        dayNumber,
      ])
      prevDayCount = dayNumber
    }
    for (const [key, value] of Object.entries(forecast)) {
      const index = getIndex(key)
      if (index === 4) {
        const {
          direction: { letters },
          speed,
        } = value
        transformedData[index].push(speed)
        transformedData[index + 1].push(letters)
      } else if (index !== -1) {
        transformedData[index].push(value)
      }
    }
  })
  return { transformedData, days }
}

function getIndex(key: string) {
  const keys = ['hour', 'height', 'period', 'energy', 'wind']
  return keys.indexOf(key)
}
