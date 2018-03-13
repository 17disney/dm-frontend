import request from '@/utils/request'

const base = 'wait-times'

export default {
  park: function park(local, date) {
    return request({
      url: `${base}/park/${local}/${date}`,
      method: 'get'
    })
  },

  attractions: function attractions(local, date, params = {}) {
    return request({
      url: `${base}/attractions/${local}/${date}`,
      method: 'get',
      params
    })
  },

  attractionsId: function attractionsId(local, date, id) {
    return request({
      url: `${base}/attractions/${local}/${date}/${id}`,
      method: 'get'
    })
  }
}
