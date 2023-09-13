import eS from 'date-fns/locale/es'
import { dateFnsLocalizer } from 'react-big-calendar'
import {format,parse,startOfWeek,getDay} from 'date-fns'

const locales = {
    'es': eS,
  }
  
  export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })
  