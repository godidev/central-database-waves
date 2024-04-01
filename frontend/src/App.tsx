import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Forecast from './components/Forecast'

function App() {
  const BrowserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Forecast />,
    },
  ])

  return (
    <>
      <RouterProvider router={BrowserRouter} />
    </>
  )
}

export default App
