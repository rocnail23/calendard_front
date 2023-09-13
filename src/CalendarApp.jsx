import React from 'react'
import { Router } from './Router/Router'
import {BrowserRouter} from "react-router-dom"
import "./index.css"
import { Provider } from 'react-redux'
import { store } from './store'
const CalendarApp = () => {
  return (
    <BrowserRouter>
    <Provider store={store}>
    <Router/>
    </Provider>
    </BrowserRouter>
  )
}

export default CalendarApp