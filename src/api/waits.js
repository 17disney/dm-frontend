import request from '@/utils/request'

// const base = 'wait-times'

export default {
  park: function park(local, date) {
    return request({
      url: `wait-times/park/${local}/${date}`,
      method: 'get'
    })
  },

  attractions: function attractions(local, date, params = {}) {
    return request({
      url: `wait-times/attractions/${local}/${date}`,
      method: 'get',
      params
    })
  },

  attractionsId: function attractionsId(local, date, id) {
    return request({
      url: `wait-times/attractions/${local}/${date}/${id}`,
      method: 'get'
    })
  },

  waitCountPark: function waitCountPark(local, params) {
    return request({
      url: `wait-count/park/${local}`,
      method: 'get',
      params
    })
  },

  waitCountAttractionsId: function waitCountAttractionsId(local, id, params) {
    return request({
      url: `wait-count/attractions/${local}/${id}`,
      method: 'get',
      params
    })
  }

  // const waitCountPark = (local, st, et) => request(`${base}/wait-count/park/${local}`, {st, et})
  // const waitCountAttractions = (local, id, data) => request(`${base}/wait-count/attractions/${local}/${id}`, data)

}
