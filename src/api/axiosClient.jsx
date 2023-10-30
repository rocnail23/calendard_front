import axios from "axios";
import {getEnv} from "../helper"

const {VITE_API_URL} = getEnv()

const axiosClient = axios.create({
    baseURL: "http://localhost:4000/app/v1"
})


axiosClient.interceptors.request.use(config => {

    config.headers = {
       "x-token": localStorage.getItem("token")
    }

    return config 
})



export default axiosClient