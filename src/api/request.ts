import axios from 'axios'

// Environment variables are defined in .env files
const baseURL = import.meta.env.VITE_SWOP_ENDPONT
const authorization = import.meta.env.VITE_SWOP_APIKEY

// Create a new axios instance
const request = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `ApiKey ${authorization}`
  }
})

export default request
