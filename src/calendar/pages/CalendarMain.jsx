import { Calendar} from 'react-big-calendar'
import React, { Fragment, useState } from 'react'
import Navbar from '../components/Navbar'
import {addHours} from 'date-fns'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Messages, localizer } from '../../helper'
import CalendarEvent from '../components/CalendarEvent'
import { ModalCalendar } from '../components/ModalCalendar'
import { useUi ,useCalendar} from '../../hooks'
import OpenBtn from '../components/openBtn'
import DeleteBtn from '../components/deleteBtn'





export const CalendarMain = () => {

  const [lastView, setLastView] = useState(localStorage.getItem("view") || "week")
  const {openModalHook} = useUi()
  const {notes:Events,selectEvent} = useCalendar()

  const getStyle = ({end,start,title}) => {

    const style = {
      backgroundColor: "#347cf7",
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
      events={Events}
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

