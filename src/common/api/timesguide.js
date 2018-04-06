import request from '@/utils/request'

const base = 'timesguide-service'

export default {
  explorerList: function list(local) {
    return request({
      url: `${base}/timesguides`,
      method: 'get',
      params: { local }
    })
  },

  explorerId: function id(id) {
    return request({
      url: `${base}/timesguides/${id}`,
      method: 'get'
    })
  },

  updateExplorerId: function updateExplorerId(id, data) {
    return request({
      url: `${base}/timesguides/${id}`,
      method: 'put',
      data
    })
  },

  login: function login(data) {
    return request({
      url: `${base}/user/login`,
      method: 'post',
      data
    })
  },
  updateInfo: function list(data) {
    return request({
      url: `${base}/user/info`,
      method: 'put',
      data
    })
  }
}
