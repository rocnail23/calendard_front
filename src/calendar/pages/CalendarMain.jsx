import { Calendar} from 'react-big-calendar'
import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {addHours} from 'date-fns'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Messages, localizer } from '../../helper'
import CalendarEvent from '../components/CalendarEvent'
import { ModalCalendar } from '../components/ModalCalendar'
import { useUi ,useCalendar, useAuth} from '../../hooks'
import OpenBtn from '../components/OpenBtn1'







export const CalendarMain = () => {

  const [lastView, setLastView] = useState(localStorage.getItem("view") || "week")
  const {openModalHook} = useUi()
  const {events,selectEvent,startGetEvents} = useCalendar()
  const {user:actualUser} = useAuth()

  useEffect(() => {
    startGetEvents()
},[])

  const getStyle = ({user}) => {

    
    const style = {
      backgroundColor: user._id == actualUser.uid ? "#347cf7": "rgb(255, 0, 0)",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white"
    }

    return {
      style
    }
  }

  const onClickEvent = (event) => {
    
    selectEvent(event)
    console.log(event)
    openModalHook()
  }

  const onDoubleClick  = (event) => {
    
    openModalHook()
   
  }

  const onChangeView  = (event) => {
    localStorage.setItem("view", event)
  }


  return (
    <Fragment>
      <Navbar/>
      <Calendar
      culture='es'
      defaultView={lastView}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "calc(100vh - 80px)"}}
      messages={Messages()}
      eventPropGetter={getStyle}
      components={{
        event: CalendarEvent,  
      }}
      onDoubleClickEvent={onDoubleClick}
      onView={onChangeView}
      onSelectEvent={onClickEvent}
    />
    <ModalCalendar/>
    <OpenBtn/>
    
    </Fragment>
  )
}

