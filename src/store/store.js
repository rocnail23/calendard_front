import { configureStore } from "@reduxjs/toolkit";
import ui from "./slices/ui";
import calendar from "./slices/calendar";
import auth from "./slices/auth"


export const store = configureStore({
    reducer:{
        ui: ui,
        calendar: calendar,
        auth: auth
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})