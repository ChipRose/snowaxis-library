const simpleOptions = ['Red', 'Green', 'Blue']

const simpleKeyOptions = [0, 1, 2, 3, 4, 5]

const arrayOptions = [
  { '#ff0000': 'Red' },
  { '#00ff00': 'Green' },
  { '#0000ff': 'Blue' }
]

const objectOptions = {
  '#ff0000': 'Red',
  '#00ff00': 'Green',
  '#0000ff': 'Blue'
}

const customOptions = [
  { id: '#ff0000', code: 'Red' },
  { id: '#00ff00', code: 'Green' },
  { id: '#0000ff', code: 'Blue' }
]

const optionsList = {
  'simple': simpleOptions,
  'simple-key': simpleKeyOptions,
  'array': arrayOptions,
  'object': objectOptions,
  'custom': customOptions,
}

export const getOptions = (type = 'simple') => {
  return optionsList[type]
}