const falseStates = [null, '', 'false', '0', 'underfined', 0]
const trueStates = ['true', '1', 1]

const transformToBoolean = (value) => {
  if (typeof value === 'boolean') return value
  if (falseStates.includes(value)) return false
  if (trueStates.includes(value) || (typeof value === 'string' && value.length)) return true
}

export { transformToBoolean }