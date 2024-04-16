import buoys from '../../../../../server/buoyData.json'

export default function BuoySelector({
  changeBuoy,
}: {
  changeBuoy: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div>
      <h2>Select a buoy</h2>
      <select onChange={(e) => changeBuoy(e)}>
        {buoys.map(({ name, station }) => (
          <option key={station} value={station}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
