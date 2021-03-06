export const BASE_PATH = '/api/autocomplete/window'

function leadingZeros(n: any, digits: any) {
  let zero = ''
  n = n.toString()

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += '0'
  }
  return zero + n
}

export function getTimeStamp() {
  const d = new Date()
  const s = leadingZeros(d.getFullYear(), 4) + '-' + leadingZeros(d.getMonth() + 1, 2) + '-' + leadingZeros(d.getDate(), 2) + ' ' + leadingZeros(d.getHours(), 2) + ':' + leadingZeros(d.getMinutes(), 2) + ':' + leadingZeros(d.getSeconds(), 2)

  return s
}
