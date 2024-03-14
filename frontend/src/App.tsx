import './App.css'
import BuoyTable from './components/BuoyTable'
import SurfForecastTable from './components/SurfForecastTable'

function App() {
  return (
    <>
      <div className="container">
        <BuoyTable />
        <SurfForecastTable />
      </div>
    </>
  )
}

export default App
