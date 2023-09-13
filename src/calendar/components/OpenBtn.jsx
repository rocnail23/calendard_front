import React from 'react'
import { useUi } from '../../hooks'

const OpenBtn = () => {

    const {openModalHook} = useUi()

  return (
    <button
    onClick={openModalHook}
    className='btn btn-primary fab'>
        <i className='fas fa-plus'></i>
    </button>
  )
}

export default OpenBtn