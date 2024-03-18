import {SurfForecast} from '../../../types'

export default function SurfForecastResponsive({data}: {data: SurfForecast[]}) {
  const {days, transformedData} = transformData(data)
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
      <div className='responsive-table table-container'>
        <table>
          <tr>
            <th>-</th>
            {days.map(([day, dayNumber]) => (
              <th colSpan={dayNumber} className='day'>
                {day}
              </th>
            ))}
          </tr>

          {transformedData.map((row, rowIndex) => (
            <tr>
              <th>{headings[rowIndex][0]}</th>
              {row.map((cell, cellIndex) => {
                if (rowIndex === 0) {
                  return (
                    <th className={days[1].includes(cellIndex) ? 'newDay' : ''}>
                      {String(cell)}:00{headings[rowIndex][1]}
                    </th>
                  )
                } else {
                  return (
                    <td className={days[1].includes(cellIndex) ? 'newDay' : ''}>
                      {String(cell)}
                      {headings[rowIndex][1]}
                    </td>
                  )
                }
              })}
            </tr>
          ))}
        </table>
      </div>
    </>
  )
}

function transformData(data: SurfForecast[]) {
  const days: Array<[string, number]> = []
  const transformedData: Array<(number | string)[]> = new Array(6)
    .fill(null)
    .map(() => [])
  let prevDayCount = -1
  data.forEach((forecast, dayNumber) => {
    if (forecast.hour === 23 || dayNumber === data.length - 1) {
      days.push([
        forecast.year + '-' + forecast.month + '-' + forecast.day,
        dayNumber - prevDayCount,
      ])
      prevDayCount = dayNumber
    }
    for (const [key, value] of Object.entries(forecast)) {
      const index = getIndex(key)
      if (index === 4) {
        const {
          direction: {letters},
          speed,
        } = value
        transformedData[index].push(speed)
        transformedData[index + 1].push(letters)
      } else if (index !== -1) {
        transformedData[index].push(value)
      }
    }
  })
  return {transformedData, days}
}

function getIndex(key: string) {
  const keys = ['hour', 'height', 'period', 'energy', 'wind']
  return keys.indexOf(key)
}
