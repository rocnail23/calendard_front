import React from 'react'
import ReactDOM from 'react-dom/client'
import CalendarApp from './CalendarApp.jsx'
import { registerSW } from "virtual:pwa-register";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
)
