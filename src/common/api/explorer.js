import request from '@/utils/request'

const base = 'explorer-service'
const cdn = 'https://park-explorer.17disney.com'

export default {
  destinations: function destinations(local) {
    return request({
      url: `${base}/explorer/destinations/${local}`,
      method: 'get'
    })
  },

  destinationsRaw: function destinationsRaw(local) {
    return request({
      url: `${base}/explorer/destinations-raw/${local}`,
      method: 'get'
    })
  },

  updateDestinationsId: function updateDestinationsId(id, data) {
    return request({
      url: `${base}/explorer/destinations/${id}`,
      method: 'put',
      data
    })
  },

  destinationsCdn: function destinationsCdn(local, type) {
    return request({
      url: `${cdn}/explorer-service/destinations/${local}/${type}`,
      method: 'get'
    })
  },

  schedules: function schedules(local, date) {
    return request({
      url: `${base}/explorer/schedules/${local}/${date}`,
      method: 'get'
    })
  }

  // destinations,
  // destinationsCdn,
  // schedules
}