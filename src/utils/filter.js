import moment from 'moment'
import { lineToObject } from './tool'
import { landArr, attLevelList } from '@/common/park-arr'

export function landName(id) {
  const aid = lineToObject(id)['__id__']
  return landArr[aid]
}

export function attLevel(id) {
  const item = attLevelList.filter(_ => _.id === id)

  let level = 1
  if (item && item[0] && item[0]['level']) {
    level = item[0]['level']
  }

  return level
}

// 时间去0
export function timeSim(time) {
  let ret
  if (time) {
    ret = moment(`${time}`, 'HH:mm:ss').format('H:mm')
  }
  return ret
}

// 人性化时间
export function goodTime(time) {
  const dist = Date.now() - time
  let ret
  if (dist < 60000 * 2) {
    ret = '刚刚'
  } else if (dist >= 60000 * 2 && dist < 60000 * 40) {
    ret = Math.round(dist / 60000) + '分钟前'
  } else if (dist >= 60000 * 40 && dist < 60000 * 1200) {
    ret = Math.round(dist / (60000 * 60)) + '小时前'
  } else {
    ret = moment(time, 'x').format('M月D日')
  }
  return ret
}
