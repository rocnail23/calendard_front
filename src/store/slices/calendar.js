import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const events = {
    _id: new Date().getTime(),
    title: "new day",
    notes: "hay que comprar pastel",
    bgColor: "#fafafa",
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
      _id: "123",
      name: "Fernando"
    }
  }

const calendarSlice = createSlice({
name: 'name',
initialState: {
    events: [
        
    ],
    activeEvent: null
},
reducers: {
    setEvent: (state,action) => {
      state.activeEvent = action.payload
    },

    newEvent: (state,action) => {
      state.events.push(action.payload)
    },
    
    editEvent: (state,action) => {
      console.log(action.payload)
      console.log("este es el evento")
      state.events = state.events.map(event => event.id == action.payload.id ? action.payload : event)
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(note =>  note.id != state.activeEvent.id)
    },
    setEvents: (state,action) => {
      state.events = action.payload
    },
    resetEvents: (state) => {
      state.events= []
      state.activeEvent = null

    }
}});


export const { setEvent, newEvent,editEvent,deleteEvent,setEvents,resetEvents} = calendarSlice.actions;
export default calendarSlice.reducer