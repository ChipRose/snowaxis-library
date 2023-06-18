const simpleValue = 'Red'
const simpleLongValue = 'Long long long long long long long long long long long long long text for text field!!!'
const simpleDateValue = '2022-04-05'
const simpleBooleanValue= true
const simpleKeyValue = '#ff0000'
const JSONValue = '{"name":"John", "age":30, "city":"New York"}'

const arrayValue = [
  'Red',
  'Green',
]

const arrayEmptyValue = ['']

const arrayKeyValue = [
  '#ff0000',
  '#00ff00',
]

const objectValue = {
  'Red': 'The Color of Activity',
  'Green': 'The Color of Relax'
}

const objectEmptyValue = { '': '' }

const objectKeyValue = {
  '#ff0000': 'The Color of Activity',
  '#00ff00': 'The Color of Relax'
}

const nestedObjectValue = {
  colors: {
    'Red': 'The Color of Activity',
    'Green': 'The Color of Relax'
  }
}

const nestedObjectKeyValue = {
  colors: {
    '#ff0000': 'The Color of Activity',
    '#00ff00': 'The Color of Relax'
  }
}

const nestedObjectEmptyValue = {
  '': { '': '' }
}

const valuesList = {
  'json':JSONValue,
  'boolean': simpleBooleanValue,
  'simple': simpleValue,
  'simple-long': simpleLongValue,
  'simple-date': simpleDateValue,
  'simple-key': simpleKeyValue,
  'array': arrayValue,
  'array-empty': arrayEmptyValue,
  'array-key': arrayKeyValue,
  'object': objectValue,
  'object-empty': objectEmptyValue,
  'object-key': objectKeyValue,
  'nested-object': nestedObjectValue,
  'nested-object-empty': nestedObjectEmptyValue,
  'nested-object-key': nestedObjectKeyValue
}

export const getValue = (type = 'simple-key') => {
  return valuesList[type]
}