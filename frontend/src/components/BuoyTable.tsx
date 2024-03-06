import { Buoy } from '../types'

export default function BuoyTable({ initialData }: { initialData: Buoy[] }) {
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
            <th>Avg Period</th>
            <th>Avg Direction</th>
            <th>Peak Direction</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((buoy) => (
            <tr key={buoy._id}>
              <th data-cell="hour">{buoy.hour}:00</th>
              <td data-cell="height">{buoy.height}m</td>
              <td data-cell="period">{buoy.period}s</td>
              <td data-cell="avg Period">{buoy.avgPeriod}</td>
              <td data-cell="avg Direction">{buoy.avgDirection}</td>
              <td data-cell="peak Direction">{buoy.peakDirection}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
