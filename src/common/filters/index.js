import moment from 'moment'
import LOCALE from '../const/locale'

export function time(value) {
  const val = moment(value, 'x').format('H:mm:ss')
  return val
}

export function timeFormat(value, src, format) {
  let val = moment(value, src).format(format)
  if (format === 'd') {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    val = week[val]
  }
  return val
}

export function fieldName(value) {
  const keys = {
    flowAvg: '平均客流',
    flowMax: '最高客流',
    ticketNum: '售票量'
  }
  return keys[value]
}

export function locale(value) {
  return LOCALE.find(_ => _.value === value)['label']
}

