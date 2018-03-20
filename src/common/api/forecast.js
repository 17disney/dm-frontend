import request from '@/utils/request'

export default {
  getPark: function getPark(local, date) {
    return request({
      url: `/forecast-service/park/${local}/${date}`,
      method: 'get'
    })
  },
  updatePark: function updatePark(local, date, data) {
    return request({
      url: `/forecast-service/park/${local}/${date}`,
      method: 'put',
      data
    })
  }
}
