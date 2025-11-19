import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: false
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user")
            window.dispatchEvent(new Event("user-rip-token"))
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

api.interceptors.request.use((config) => {
    const user = localStorage.getItem("user")

    if (user) {
        const token = JSON.parse(user).token
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})