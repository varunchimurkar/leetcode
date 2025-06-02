import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : import.meta.env.MODE === "developement" ? "http://localhost:8080/api/v1" : "/api/v1",
    withCredentials:true
})