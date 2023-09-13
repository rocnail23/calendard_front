import { useDispatch, useSelector } from "react-redux"
import { closeModal, openModal } from "../store/slices/ui"

export const useUi = () => {

  const {isOpenModal} =  useSelector(state => state.ui)
  const dispatch = useDispatch()

  const closeModalHook = () => {
    dispatch(closeModal())
  }

  const openModalHook = () => {

    dispatch(openModal())
  }


  return {

    isOpenModal,

    closeModalHook,
    openModalHook
  }

}