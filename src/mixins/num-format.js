export const numFormat = {
  filters: {
    // 格式化数字，千分位表示
    numFormat(num, fixNum) {
      let reg = null
      if (!num) {
        // console.log(num, 123)
        if (num === 0) {
          num = '0.00'
        }
        return num
      }
      var toFixedNum = Number(num).toFixed(fixNum)

      if (toFixedNum.indexOf('.') > -1) {
        reg = /(\d)(?=(\d{3})+\.)/g
        return (toFixedNum).replace(reg, '$1,')
      } else {
        reg = /\d{1,3}(?=(\d{3})+$)/g
        return (toFixedNum).replace(reg, '$&,')
      }
    }
  }
}
