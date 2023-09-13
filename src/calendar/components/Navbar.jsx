import React from 'react'
import { useAuth } from '../../hooks'

const Navbar = () => {

  const {logoutUser,user} = useAuth()

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt'></i>
            &nbsp;
            {user.name}
        </span>

        <button onClick={logoutUser} className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt'></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}

export default Navbar