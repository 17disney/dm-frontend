import request from '@/utils/request'

const base = 'explorer-service'

export default {
  attractions: function attractions(local, date, params = {}) {
    return request({
      url: `${base}/wait-times/attractions/${local}/${date}`,
      method: 'get',
      params
    })
  },

  attractionsId: function attractionsId(local, date, id) {
    return request({
      url: `${base}/wait-times/attractions/${local}/${date}/${id}`,
      method: 'get'
    })
  },

  attractionsIdCount: function attractionsIdCount(local, id, params) {
    return request({
      url: `${base}/wait-count/attractions/${local}/${id}`,
      method: 'get',
      params
    })
  },

  park: function park(local, date) {
    return request({
      url: `${base}/wait-times/park/${local}/${date}`,
      method: 'get'
    })
  },

  parkCount: function parkCount(local, params) {
    return request({
      url: `${base}/wait-count/park/${local}`,
      method: 'get',
      params
    })
  }
}
