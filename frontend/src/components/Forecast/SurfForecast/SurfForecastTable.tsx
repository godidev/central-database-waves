import { SurfForecast } from '../../../types'

export default function SurfForecastTable({ data }: { data: SurfForecast[] }) {
  const date = new Date()
  const currentHour = date.getHours()
  const currentDay = date.getDate()

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              {data[0]?.year}/{data[0]?.month}/{data[0]?.day}
            </th>
            <th>Height</th>
            <th>Period</th>
            <th>Energy</th>
            <th>Wind Speed</th>
            <th>Wind Direction</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              _id,
              day,
              hour,
              height,
              period,
              energy,
              wind: {
                speed,
                direction: { letters },
              },
            }) => (
              <tr
                key={_id}
                className={
                  currentDay === day && currentHour === hour ? 'now' : ''
                }
              >
                <th data-cell='hour'>{hour}:00</th>
                <td data-cell='height'>{height}m</td>
                <td data-cell='period'>{period}s</td>
                <td data-cell='energy'>{energy}</td>
                <td data-cell='wind-speed'>{speed}m/s</td>
                <td data-cell='wind-direction'>{letters}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
