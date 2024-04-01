import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Forecast from './components/Forecast'
import Menu from './components/Menu'

function App() {
  return (
    <Router>
      <Menu />
      <div className='container'>
        <Routes>
          <Route path='/forecast' element={<Forecast />} />
          <Route path='/previous' element={<div>previous</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
