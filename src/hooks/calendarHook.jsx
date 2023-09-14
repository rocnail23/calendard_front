import { useDispatch, useSelector } from "react-redux"
import { deleteEvent, editEvent, newEvent, resetEvents, setEvent, setEvents } from "../store/slices/calendar"
import axiosClient  from "../api/axiosClient"
import { convertData } from "../helper/convertData"
export const useCalendar = () => {

    const dispatch = useDispatch()
    const {events,activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)

    const selectEvent = (event) => {
        dispatch(setEvent(event))
    }

    const startingSaveEvent = async(event) => {
    // todo backend

    if(event.id){
        console.log("hola no estoy")
        try {
          const res  =  await axiosClient.put(`/events/${event.id}`,event)
          console.log(res)
            dispatch(editEvent(event))
        } catch (error) {
            console.log(error)
        }
        
    }else{

        const res = await axiosClient.post("/events",event)
        console.log(res.data)
        console.log({hola: event})
        dispatch(newEvent({...event, id: res.data.id,user}))

    }

    }

    const startDeleteEvent = async() => {
        try {
            await axiosClient.delete(`/events/${activeEvent.id}`)
            dispatch(deleteEvent())
        } catch (error) {
           console.log(error) 
        }
       
    }

    const startGetEvents = async() => {

        try {

            const {data} = await axiosClient.get("/events")
            const events = convertData(data)
            dispatch(setEvents(events))
            console.log(events)

        } catch (error) {
            console.log(error)
        }

       
    }

    const clearEvents = () => {
        dispatch(resetEvents())
    }


    return {
        events,
        activeEvent,
        selectEvent,
        startingSaveEvent,
        startDeleteEvent,
        showButton: !!activeEvent,
        startGetEvents,
        clearEvents
    }

}