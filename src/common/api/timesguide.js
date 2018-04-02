import request from '@/utils/request'

const base = 'timesguide-service'

export default {
  list: function list(local, params = {}) {
    return request({
      url: `${base}/timesguide`,
      method: 'get',
      params
    })
  }
}
