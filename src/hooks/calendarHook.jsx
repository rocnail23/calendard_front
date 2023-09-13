import { useDispatch, useSelector } from "react-redux"
import { deleteEvent, editEvent, newEvent, setEvent } from "../store/slices/calendar"

export const useCalendar = () => {

    const dispatch = useDispatch()
    const {notes,activeEvent} = useSelector(state => state.calendar)

    const selectEvent = (event) => {
        dispatch(setEvent(event))
    }

    const startingSaveEvent = async(event) => {
    // todo backend

    if(event._id){
        console.log("hola no estoy")
        dispatch(editEvent(event))
    }else{
        console.log({hola: event})
        dispatch(newEvent(event))

    }

    }

    const startDeleteEvent = () => {

        //todo

        dispatch(deleteEvent())

    }


    return {
        notes,
        activeEvent,
        selectEvent,
        startingSaveEvent,
        startDeleteEvent,
        showButton: !!activeEvent
    }

}