import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

axiosClient.interceptors.request.use(
  function (config) {
    config.headers.set('authorization', localStorage.getItem('token'))
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
