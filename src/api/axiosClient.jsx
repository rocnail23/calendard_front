import axios from "axios";
import {getEnv} from "../helper"

const {VITE_API_URL} = getEnv()

const axiosClient = axios.create({
    baseURL: VITE_API_URL
})


axiosClient.interceptors.request.use(config => {

    config.headers = {
       "x-token": localStorage.getItem("token")
    }

    return config 
})



export default axiosClient