import request from '@/utils/request'

const base = 'wait_times'

export function park(local, date) {
  return request({
    url: `${base}/park/${local}/${date}`,
    method: 'get'
  })
}

export function attractions(local, date) {
  return request({
    url: `${base}/attractions/${local}/${date}`,
    method: 'get'
  })
}

export function attractionsId(local, date, id) {
  return request({
    url: `${base}/attractions/${local}/${date}/${id}`,
    method: 'get'
  })
}
