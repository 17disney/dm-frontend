import request from '@/utils/request'

const base = 'wait-times-service'

export default {
  ticketAvailable: function ticketAvailable(local, params) {
    return request({
      url: `${base}/ticket/available/${local}`,
      method: 'get',
      params
    })
  },

  ticketAvailableDate: function ticketAvailableDate(local, date) {
    return request({
      url: `${base}/ticket/available/${local}/${date}`,
      method: 'get'
    })
  }
}
