import React from 'react'
import { useCalendar, useUi } from '../../hooks'

const DeleteBtn = () => {

    const {startDeleteEvent,showButton} = useCalendar()
    const {closeModalHook} = useUi()

    const handleDelete = () => {
        startDeleteEvent()
        closeModalHook()
    }

  return (
    <button
    onClick={handleDelete}
    style={{display: showButton ? "":"none"}}
    className='btn btn-danger fab-danger'>
        <i className='fas fa-trash'></i>
    </button>
  )
}

export default DeleteBtn