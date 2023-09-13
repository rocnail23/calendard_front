import React, { useEffect } from 'react'
import {Routes, Route,Navigate} from "react-router-dom"
import { Auth } from '../auth/pages'
import { CalendarMain } from '../calendar/pages'
import { useAuth } from '../hooks'
export const Router = () => {

    const {state,checkingToken} = useAuth()

    useEffect(() => {
      checkingToken()
    },[])
  
  return (
    <Routes>
        {state != "authenticated" 

        ?<>
          <Route path='/auth/*' element={<Auth/>} /> 
          <Route path="/*" element={<Navigate to="/auth"/>}/>
        </>
        :<>
        <Route path="/" element={<CalendarMain/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/> 
        </>}

      
    </Routes>
  )
}

