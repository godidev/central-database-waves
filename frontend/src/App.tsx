import './App.css'
import BuoyTable from './components/Forecast/Buoys/BuoyTable'
import SurfForecast from './components/Forecast/SurfForecast/SurfForecast'

function App() {
  return (
    <>
      <div className='container'>
        <BuoyTable />
        <SurfForecast />
      </div>
    </>
  )
}

export default App
