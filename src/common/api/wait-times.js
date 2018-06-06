import request from '@/utils/request'
const BASE = 'wait-times-service'

export default {
  waitsHome: function waitsHome(local, date) {
    return request({
      url: `${BASE}/wait-times/home/${local}/${date}`,
      method: 'get'
    })
  },

  ticket: function ticketAvailable(local, params) {
    return request({
      url: `${BASE}/ticket/available/${local}`,
      method: 'get',
      params
    })
  },

  ticketDate: function ticketAvailableDate(local, date) {
    return request({
      url: `${BASE}/ticket/available/${local}/${date}`,
      method: 'get'
    })
  },

  parkDate: function parkDate(local, date) {
    return request({
      url: `${BASE}/wait-times/park/${local}/${date}`,
      method: 'get'
    })
  },

  park: function park(local, params) {
    return request({
      url: `${BASE}/wait-times/park/${local}`,
      method: 'get',
      params
    })
  },

  attractionsDate: function attractionsDate(local, id, date) {
    return request({
      url: `${BASE}/wait-times/attractions/${local}/${id}/${date}`,
      method: 'get'
    })
  },

  attractions: function attractions(local, id, params) {
    return request({
      url: `${BASE}/wait-times/attractions/${local}/${id}`,
      method: 'get',
      params
    })
  },

  destinations: function destinations(local) {
    return request({
      url: `${BASE}/destinations/park/${local}`,
      method: 'get'
    })
  },

  destinationsRaw: function destinationsRaw(local) {
    return request({
      url: `${BASE}/destinations/raw/${local}`,
      method: 'get'
    })
  },

  updateDestinationsId: function updateDestinationsId(id, data) {
    return request({
      url: `${BASE}/destinations/park/destinations/${id}`,
      method: 'put',
      data
    })
  },

  schedules: function schedules(local, date) {
    return request({
      url: `${BASE}/explorer/park/schedules/${local}/${date}`,
      method: 'get'
    })
  }
}
