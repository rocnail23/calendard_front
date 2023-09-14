import React from 'react'
import { useAuth, useCalendar } from '../../hooks'

const Navbar = () => {

  const {logoutUser,user} = useAuth()
  const {clearEvents} = useCalendar()

  const logout = () => {
    logoutUser()
    clearEvents()
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt'></i>
            &nbsp;
            {user.name}
        </span>

        <button onClick={logout} className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt'></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}

export default Navbar