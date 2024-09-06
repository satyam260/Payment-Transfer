import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8082',
    headers: {
        'Content-Type': 'application/json'
    }
})