import request from '@/utils/request'

const base = 'explorer-service'

export function destinations(local) {
  return request({
    url: `${base}/destinations/${local}`,
    method: 'get'
  })
}

export function schedules(local, date) {
  return request({
    url: `${base}/schedules/${local}/${date}`,
    method: 'get'
  })
}
