import request from '@/utils/request'

const base = 'explorer-service'

export function destinations(local, type) {
  return request({
    url: `${base}/destinations/${local}/${type}`,
    method: 'get'
  })
}

export function schedules(local, date) {
  return request({
    url: `${base}/schedules/${local}/${date}`,
    method: 'get'
  })
}
