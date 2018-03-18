import request from '@/utils/request'

const base = 'explorer-service'
export default {
  available: function available(local, params) {
    return request({
      url: `${base}/ticket/available/${local}`,
      method: 'get',
      params
    })
  },

  availableDate: function available(local, date) {
    return request({
      url: `${base}/ticket/available/${local}/${date}`,
      method: 'get'
    })
  }

}
