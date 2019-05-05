import axios from 'axios'
import store from '../store'
import Message from './message'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: '/',
  baseURL: 'http://api.17disney.com/',
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    const { status, data } = res
    if (status === 200) {
      const { error, message } = data
      if (error) {
        Message({
          error,
          type: 'warning',
          duration: 5 * 1000
        })
      }

      if (message) {
        Message({
          error,
          type: 'warning',
          duration: 5 * 1000
        })
      }
      return data
    } else {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
  },

  error => {
    const { response } = error
    let { message } = error
    if (response && response.data && response.data.error) {
      message = response.data.error
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
