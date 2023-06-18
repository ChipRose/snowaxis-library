const isSimpleType = (value) => ['string', 'number'].includes(typeof value)

const getValidOption = (option, optionsDef) => {
  //invalid
  if (typeof option === 'undefined' || option === null)
    return { value: '', label: '' }

  //simpleMeta
  if (isSimpleType(option)) {
    return { value: String(option), label: String(option) }
  }

  //valueLabelArrayMeta
  if (option.label && (!optionsDef || optionsDef && !Object.keys(optionsDef).length)) return {
    value: option.value ? option.value : option.label,
    label: option.label
  }

  //customObjectArrayMeta
  if (
    optionsDef &&
    typeof optionsDef?.label !== 'undefined' &&
    typeof optionsDef?.value !== 'undefined'
  ) {
    return { value: String(option[optionsDef.value]), label: String(option[optionsDef.label]) }
  }


  const { label, ...rest } = option
  if (typeof label === 'string')
    return { value: rest?.[0] ?? label, label: label }

  //objectMeta
  if (typeof option === 'object' && Object.keys(option).length)
    return {
      value: Object.entries(option)[0][0],
      label: Object.entries(option)[0][1]
    }
  return null
}

const getOptionsArray = (meta) => {
  const { options, optionsDef } = meta || {}
  //invalid
  if (!options || options && typeof options !== 'object') return []
  //transform options to array
  const _options = Array.isArray(options)
    ? options
    : Object.keys(options).map((key) => ({ [key]: options[key] }))

  return [
    ...(_options?.map((option) => getValidOption(option, optionsDef)) ?? [])
  ]
}
/**
 * Transform income options to format
 * [{value:'keyValue-0', label:'optionVal-0'},{value:'keyValue-1', label:'optionVal-1'}]
 * @param meta - income meta with different options type.
 * simpleMeta = { options: ['Red', 'Green', 'Blue']}
 * objectMeta = { options: {'#ff0000': 'Red', '#00ff00': 'Green','#0000ff': 'Blue'}}
 * objectsArrayMeta = { options: [{ '#ff0000': 'Red' }, { '#00ff00': 'Green' }, { '#0000ff': 'Blue' }]}
 * valueLabelArrayMeta = {
 *  options: [
      { value: '#ff0000', label: 'Red' },
      { value: '#00ff00', label: 'Green' },
      { value: '#0000ff', label: 'Blue' }
    ]
  }
 * customObjectArrayMeta = {
 *  options: [
      { colorValue: '#ff0000', colorName: 'Red' },
      { colorValue: '#00ff00', colorName: 'Green' },
      { colorValue: '#0000ff', colorName: 'Blue' }
    ],
    optionsDef: {
      value: 'colorValue',
      label: 'colorName'
    }
  }
 */
const transformOptions = (meta = { options: [], optionsDef: {} }) => {
  //add empty option
  const hasEmptyOption = getOptionsArray(meta).find(({ value }) => value === '')

  const getOptionsArrayWithoutEmpty = getOptionsArray(meta).filter((option) => option.value !== '')
  const rezult = hasEmptyOption ? [...getOptionsArrayWithoutEmpty, {
    value: '',
    label: hasEmptyOption.label || '(Blank value)'
  }] : getOptionsArray(meta)

  return rezult
}

const getAvailableOptions = (keyVal, values, meta) => {
  const internalOptions = transformOptions(meta)
  const hasEmptyOption = internalOptions.find((option) => option.value === '')
  const choosenOption = internalOptions.filter((option) => option.value === keyVal)[0]
  const arrayValue = Array.isArray(values) ? values : typeof values === 'object' ? Object.keys(values) : []
  const availableOptions = [
    ...internalOptions.filter(
      (option) => {
        return !arrayValue.includes(option.value)
      }
    )
  ]

  if (keyVal === '' && hasEmptyOption) availableOptions.push(choosenOption)
  if (keyVal !== '') availableOptions.push(choosenOption)

  return availableOptions.length ? availableOptions : []
}

export { transformOptions, getAvailableOptions }