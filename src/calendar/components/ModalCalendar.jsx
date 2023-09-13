import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import { addHours } from 'date-fns';
import { differenceInHours } from 'date-fns';
import { differenceInMinutes } from 'date-fns';
import { useCalendar, useUi } from '../../hooks';
import DeleteBtn from './deleteBtn';

registerLocale("es",es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');


export const ModalCalendar = () => {
     const {activeEvent,selectEvent, startingSaveEvent} = useCalendar()
     const {isOpenModal, closeModalHook} = useUi()
    const [submited, setSubmited] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(true);
    const [form, setForm] = useState({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2)
    })
    

    const closeModal = () => {
        selectEvent(null)
        setForm({
          title: "",
          notes: "",
          start: new Date(),
          end: addHours(new Date(), 2)
        })
        closeModalHook()
    }

    useEffect(() => {
      if(activeEvent){
        setForm(activeEvent)
      }
    },[activeEvent])

    const HandleChange = ({target}) => {
      setForm({
        ...form,
        [target.name]:target.value
      })

    }

    const HandleTime = (date,time) => {

      setForm({
        ...form,
        [time]: date
      })

    }

    const handleSubmit = (e) => {
      e.preventDefault()
      setSubmited(true)
      const diffenrece = differenceInMinutes(form.end,form.start)

      if(diffenrece <= 0) return
      console.log(diffenrece)
      startingSaveEvent(form)
    }

    const isValid = useMemo(() => {
      if(!submited) return ""
      return form.title.length <= 0 ? "is-invalid" : "" 
    },[submited])
    console.log(form)
    
  return (
    <Modal
    isOpen={isOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    overlayClassName="modal-fondo"
    className="modal"
    contentLabel="Example Modal"
    closeTimeoutMS={200}
  >
    <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={handleSubmit}>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <DatePicker className='form-control'
        dateFormat="Pp"
        showTimeSelect
        locale="es"
        timeCaption='hora'
        selected={form.start}
        onChange={(date) => HandleTime(date,"start")}/>
        
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <DatePicker className='form-control'
        dateFormat="Pp"
        showTimeSelect
        locale="es"
        timeCaption='hora'
        selected={form.end}
        minDate={form.start}
        onChange={(date) => HandleTime(date,"end")}
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${isValid}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={form.title}
            onChange={HandleChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={form.notes}
            onChange={HandleChange}
            
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
<DeleteBtn/>
  </Modal>
  )
}

