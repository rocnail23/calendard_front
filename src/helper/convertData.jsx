import {formatISO, parseISO} from "date-fns"

export const convertData = (data) => {

    data.map(event => {

        event.start = parseISO(event.start)
        event.end = parseISO(event.end)

        return event
    })

    return data

}