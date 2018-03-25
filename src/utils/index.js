import moment from 'moment'

export function mathRegression(coefficients, x) {
  let y = 0
  let k = 0
  for (let s = 0; s < coefficients.length; s++) {
    const _val = coefficients[k] * Math.pow(x, s)
    y += _val
    k++
  }
  return y
}

export function mathArrAvg(arr) {
  let sum = 0
  arr.forEach(_ => {
    sum += _
  })
  const avg = sum / arr.length
  return avg
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export function sortBy(attr, rev = true) {
  // 第二个参数没有传递 默认升序排列

  rev = (rev) ? 1 : -1

  return function(a, b) {
    a = a[attr]
    b = b[attr]
    if (a < b) {
      return rev * -1
    }
    if (a > b) {
      return rev * 1
    }
    return 0
  }
}

export function objectToLine(arg) {
  let line = []

  for (const k in arg) {
    const item = arg[k]
    if (k === '__id__') {
      line.push(item)
    } else {
      line.push(`${k}=${item}`)
    }
  }

  line = line.join(';')
  return line
}

export function mathOpenMinutes(startTime, endTime) {
  const start = moment(startTime, 'HH:mm:ss')
  const end = moment(endTime, 'HH:mm:ss')

  const openMinutes = end.diff(start, 'minutes')
  // const { runDefault } = this.data
  // const maxNumber = openMinutes * runDefault
  // this.percentage = Math.round(this.number / maxNumber * 100)
  // console.log(this.percentage)
  // this.maxNumber = maxNumber
  return openMinutes
}

// const { startTime, endTime } = this.wait
