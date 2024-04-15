import { useBuoys } from '../../../hooks/useBuoys'
import { buoyTypes } from '../../../types'
import NewDayRecord from './NewDayRecord'

export default function BuoyTable() {
  const { data } = useBuoys({ limit: 6 })
  const firstDate = new Date(data[0]?.fecha)

  return (
    <>
      <div className='buoys table-container'>
        <h1>Buoys</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th key={'height'}>Height</th>
              <th key={'period'}>Period</th>
              <th key={'Avg period'}>Avg Period</th>
              <th key={'avg direction'}>Avg Direction</th>
              <th key={'peak direction'}>Peak Direction</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ datos, fecha }, index) => {
              {
                index === 0 && (
                  <NewDayRecord
                    key={firstDate.toLocaleString()}
                    modifiedDate={firstDate}
                  />
                )
              }

              const modifiedDate = new Date(fecha)
              modifiedDate.setHours(modifiedDate.getHours() + 2)
              if (
                modifiedDate.getHours() === 0 ||
                modifiedDate.getHours() === 1
              ) {
                modifiedDate.setDate(modifiedDate.getDate() + 1)
              }
              const slicedHours = modifiedDate.getHours() < 10 ? 4 : 5
              return [
                modifiedDate.getHours() === 23 && (
                  <NewDayRecord
                    key={modifiedDate.toLocaleString()}
                    modifiedDate={modifiedDate}
                  />
                ),
                <tr key={modifiedDate.toString()}>
                  <th data-cell='hour'>
                    {modifiedDate
                      .toLocaleTimeString('es-ES')
                      .slice(0, slicedHours)}
                  </th>
                  <td data-cell='height'>{datos[buoyTypes.Altura]}m</td>
                  <td data-cell='period'>{datos[buoyTypes.Periodo]}s</td>
                  <td data-cell='avg Period'>
                    {datos[buoyTypes.PeriodoMedio]}s
                  </td>
                  <td data-cell='avg Direction'>
                    {datos[buoyTypes.DireccionMedia]}
                  </td>
                  <td data-cell='peak Direction'>
                    {datos[buoyTypes.DireccionPico]}
                  </td>
                </tr>,
              ]
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
