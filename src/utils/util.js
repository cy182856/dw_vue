import store from '@/store/index'

export function objectKeyIsEmpty(obj) {
  let empty = false
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === '') {
        empty = true
        break
      }
    }
  }
  return empty
}

export function getDictName(dictTypeId, dictId) {
  store.dispatch('getDicts', dictTypeId)
  const dicts = store.getters.dictList[dictTypeId]
  if (dicts && dicts.length) {
    const dict = dicts.find(item => item.dictId === dictId)
    if (dict) {
      return dict.dictName
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export function getScheduleTypeColor(scheduleType) {
  if (scheduleType === 'goout') return '#FF00FF'
  if (scheduleType === 'meeting') return '#EEAD0E'
  if (scheduleType === 'other') return '#9BCD9B'
  if (scheduleType === 'todo') return '#6B238E'
}

// 格式化数字，千分位表示
export function numberFormat(num, fixNum) {
  let reg = null
  if (isNaN(Number(num))) {
    return num
  }
  var toFixedNum = toFixed(num, fixNum)
  if (toFixedNum.indexOf('.') > -1) {
    reg = /(\d)(?=(\d{3})+\.)/g
    return (toFixedNum).replace(reg, '$1,')
  } else {
    reg = /\d{1,3}(?=(\d{3})+$)/g
    return (toFixedNum).replace(reg, '$&,')
  }
}

export function toFixed(number, n) {
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20')
  }
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString()
  }
  if (typeof (n) === 'undefined' || n === 0) {
    return (Math.round(number)).toString()
  }
  let result = number.toString()
  const arr = result.split('.')
  // 整数的情况
  if (arr.length < 2) {
    result += '.'
    for (let i = 0; i < n; i += 1) {
      result += '0'
    }
    return result
  }
  const integer = arr[0]
  const decimal = arr[1]
  if (decimal.length === n) {
    return result
  }
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0'
    }
    return result
  }
  result = integer + '.' + decimal.substr(0, n)
  const last = decimal.substr(n, 1)
  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    const x = Math.pow(10, n)
    result = (Math.round((parseFloat(result) * x)) + 1) / x
    result = result.toFixed(n)
  }
  return result
}

export function regTest(value, reg) {
  const re = new RegExp(reg)
  return re.test(value)
}

export function dateFormat(date, fmt) { // author: meizz
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export function addMonth(d, m) {
  var ds = d.split('-')
  var date = new Date(ds[0], ds[1] - 1, 1)
  date.setMonth(date.getMonth() + m)
  return dateFormat(date, 'yyyy-MM')
}
