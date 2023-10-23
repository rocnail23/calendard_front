import React from 'react'
import ReactDOM from 'react-dom/client'
import CalendarApp from './CalendarApp.jsx'
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("offline ready");
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
)
