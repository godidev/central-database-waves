import './App.css'
import BuoyTable from './components/BuoyTable'
import SurfForecastTable from './components/SurfForecastTable'
import { useBuoys } from './hooks/useBuoys'
import { useSurfForecast } from './hooks/useForecast'

function App() {
  const { setDaySelected, uniqueDays, initialData } = useBuoys({ limit: 6 })
  const { data } = useSurfForecast()
  return (
    <>
      <div className="day-selector">
        <h1>Buoy Data</h1>
        <p>Select a day</p>
        <select
          name="day"
          id="day"
          onChange={(e) => setDaySelected(Number(e.target.value))}
        >
          <option value="0">Select a day</option>
          {uniqueDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <BuoyTable initialData={initialData} />
      <SurfForecastTable initialData={data} />
    </>
  )
}

export default App
