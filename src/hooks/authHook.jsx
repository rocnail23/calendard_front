import { useDispatch, useSelector } from "react-redux"
import axiosClient from "../api/axiosClient"
import { checking, clearMessage, login, onLogout } from "../store/slices/auth"
import { useEffect } from "react"
import Swal from "sweetalert2"


export const useAuth = () => {

    const {user,state,message} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!message) return 
        Swal.fire(
            'error',
            message,
            'error'
          )
    },[message])
    
    const loginUser = async({email,password}) => {

        dispatch(checking())

        try {

            const res = await axiosClient.post("/auth",{
                email,password
            })
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("token-time", new Date().getTime())

            dispatch(login({
               name: res.data.name,
               token: res.data.token,
               uid: res.data.uid
            }))

            console.log(res.data)
        } catch (error) {
            console.log(error)
            dispatch(onLogout(error.response.data.mgs))
            setTimeout(() => {
                dispatch(clearMessage())
            },10000)
        }
    }       
    
    const registerUser = async({email,password,name}) => {

        dispatch(checking())

        try {

            const res = await axiosClient.post("/auth/create",{
                email,
                password,
                name
            })

            localStorage.setItem("token",res.data.token)
            localStorage.setItem("token-time", new Date().getTime())

            dispatch(login({
                name: res.data.name,
                token: res.data.token
             }))

            console.log(res)

        } catch (error) {
            console.log(error)
            dispatch(onLogout())
        }

    }

    const logoutUser = async() => {
        console.log("cerrado")
        dispatch(onLogout())
        localStorage.clear()
    }

    const checkingToken = async() => {
        
        const token = localStorage.getItem("token")
        if(!token) return dispatch(onLogout())
        dispatch(checking())

        try {       
            const res = await axiosClient.get("/auth/renew")
            
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("token-time", new Date().getTime())

            dispatch(login({
                ...res.data
            }))
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }

    return {
        user,state,message,
        
        //func
        loginUser,
        registerUser,
        checkingToken,
        logoutUser
    }

}