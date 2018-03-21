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
