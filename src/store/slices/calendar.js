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
    notes: [
        events
    ],
    activeEvent: null
},
reducers: {
    setEvent: (state,action) => {
      state.activeEvent = action.payload
    },

    newEvent: (state,action) => {
      state.notes.push(action.payload)
    },
    
    editEvent: (state,action) => {
      console.log(action.payload)
      console.log("este es el evento")
      state.notes = state.notes.map(event => event._id == action.payload._id ? action.payload : event)
    },
    deleteEvent: (state, action) => {
      state.notes = state.notes.filter(note =>  note._id != state.activeEvent._id)
    }
}});


export const { setEvent, newEvent,editEvent,deleteEvent} = calendarSlice.actions;
export default calendarSlice.reducer