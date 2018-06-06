import axios from 'axios'
// MessageBox
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: 'http://park-cn.17disney.com/api/v3', // process.env.BASE_API, // api的base_url
  baseURL: '/',
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response
    const { status } = res

    if (status === 200) {
      const { message } = response.data

      if (message) {
        Message({
          message,
          type: 'warning',
          duration: 5 * 1000
        })
      }
      return response.data
    } else if (status === 204) {
      Message({
        message: '无内容',
        type: 'warning',
        duration: 5 * 1000
      })
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
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
