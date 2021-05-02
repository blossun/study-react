export const getNumberFormatWithComma = (price: number | string) => {
  if (!isNumeric(price)) return price
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const isNumeric = (value: string | Number): boolean => {
  if (value === 0) {
    return true
  }
  if (value) {
    return !isNaN(Number(value.toString()))
  }
  return false
}

// [2019,1,22,17,16,42] -> "2019-01-22 17:16:42"
export const datetimeInArrayToString = (datetime: number[]): string => {
  let result = ''
  datetime.forEach((c, i) => {
    switch (i) {
      case 0:
        result = '' + c
        return
      case 1:
      case 2:
        result = result + '-'
        break
      case 3:
        result = result + ' '
        break
      case 4:
      case 5:
        result = result + ':'
    }
    result = result + ('0' + c).slice(-2)
  })
  return result
}
