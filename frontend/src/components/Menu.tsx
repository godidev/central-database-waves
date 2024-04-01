import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <nav className='menu'>
      <ul>
        <li>
          <NavLink to={'/forecast'}>Forecast</NavLink>
        </li>
        <li>
          <NavLink to='/previous'>Previous</NavLink>
        </li>
      </ul>
    </nav>
  )
}
