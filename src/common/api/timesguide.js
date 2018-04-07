import request from '@/utils/request'

const base = 'timesguide-service'

export default {
  explorerList: function list(local) {
    return request({
      url: `${base}/v1/timesguides`,
      method: 'get',
      params: { local }
    })
  },

  explorerId: function id(id) {
    return request({
      url: `${base}/v1/timesguides/${id}`,
      method: 'get'
    })
  },

  updateExplorerId: function updateExplorerId(id, data) {
    return request({
      url: `${base}/v1/timesguides/${id}`,
      method: 'put',
      data
    })
  }
}
