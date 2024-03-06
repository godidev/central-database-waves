import { SurfForecast } from '../types'

export default function SurfForecastTable({
  initialData,
}: {
  initialData: SurfForecast[]
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              {initialData[0]?.year}/{initialData[0]?.month}/
              {initialData[0]?.day}
            </th>
            <th>Height</th>
            <th>Period</th>
            <th>Energy</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((forecast) => (
            <tr key={forecast._id}>
              <th data-cell="hour">{forecast.hour}:00</th>
              <td data-cell="height">{forecast.height}m</td>
              <td data-cell="period">{forecast.period}s</td>
              <td data-cell="energy">{forecast.energy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
