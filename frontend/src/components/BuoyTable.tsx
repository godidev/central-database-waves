import { useBuoys } from '../hooks/useBuoys'
import { Buoy } from '../types'

export default function BuoyTable() {
  const { data } = useBuoys({ limit: 6 })
  data.sort(compararRegistros)
  return (
    <>
      <div className='buoys'>
        <h1>Buoys</h1>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>
                  {data[0]?.year}/{data[0]?.month}/{data[0]?.day}
                </th>
                <th>Height</th>
                <th>Period</th>
                <th>Avg Period</th>
                <th>Avg Direction</th>
                <th>Peak Direction</th>
              </tr>
            </thead>
            <tbody>
              {data.map((buoy) => (
                <tr key={buoy._id}>
                  <th data-cell='hour'>{buoy.hour}:00</th>
                  <td data-cell='height'>{buoy.height}m</td>
                  <td data-cell='period'>{buoy.period}s</td>
                  <td data-cell='avg Period'>{buoy.avgPeriod}</td>
                  <td data-cell='avg Direction'>{buoy.avgDirection}</td>
                  <td data-cell='peak Direction'>{buoy.peakDirection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

// Función de comparación
const compararRegistros = (a: Buoy, b: Buoy) =>
  a.year - b.year || a.month - b.month || a.day - b.day || a.hour - b.hour
