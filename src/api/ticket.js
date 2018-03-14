import request from '@/utils/request'

export default {
  available: function available(local, params) {
    return request({
      url: `/ticket/available/${local}`,
      method: 'get',
      params
    })
  },

  availableDate: function available(local, date) {
    return request({
      url: `/ticket/available/${local}/${date}`,
      method: 'get'
    })
  }

}
