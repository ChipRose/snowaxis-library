import React, { useRef } from 'react'
import { SnowList, SnowPaper } from '../../../adapter'
import { ScTextField, ScComboField } from '../../baseEditableFields'
import { ScClearButton, ScAddListItemButton } from '../../buttons'
import { ScListLabel } from '../../layout'
import {
  getAvailableOptions,
  transformOptions,
  removeArrayItem
} from '../../../util'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/**
 * normalisedOptions - cast income options to options object
 * @param listType - type of list item.
 *        'flat' (default) -  means string-castable item type.
 *       'object'-  object contained label and value data
 * @param options - available options List can have
 * @param optionsDef - rules to parse option (-and item in case of listType==='object) value
 * @returns {} of type{ value:label,...}
 */

const FlatListView = styled(SnowList)`
  min-width: 100%;
  &.MuiList-padding {
    padding: 0;
  }
  .MuiListItem-root {
    padding: 0;
  }
`

const FlatListItemView = styled.li`
  ${({ theme }) => `
    padding: ${`${theme.indent.main} ${theme.indent.secondary}`};
  `}
  box-sizing: border-box;
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: 1fr 40px;
  :last-child {
    margin-bottom: 0;
  }
`

const FlatListFieldView = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  width: 100%;
`

const FlatListButtonBoxView = styled.div``

export const ScFlatValuesListField = ({
  value = [],
  onUpdate = () => {},
  updateDelay = 500,
  code = '',
  meta = {},
  alertOnNewValue = true,
  label = '',
  labelPlacement = 'top',
  inputWidth = 100,
  variant = 'outlined',
  isGroupField = false,
  labelFontProps = { fontWeight: '', fontSize: '' },
  fieldFontProps = { fontWeight: '', fontSize: '' },
  ...props
}) => {
  const labelProps = {
    code,
    label,
    labelPlacement,
    isGroupField,
    inputWidth,
    labelFontProps
  }
  const currentIdx = useRef(0)
  const arrayValue = Array.isArray(value) ? value : ['']
  const { options, optionsDef, listType } = meta || {}
  const hasOptions = !!options

  const normalisedOptions = transformOptions({
    options: transformOptions(meta)
  })

  const newItemValue =
    optionsDef?.value && listType !== 'flat' ? { [optionsDef.value]: '' } : ''

  const replace = (array, index, ...items) => [
    ...array.slice(0, index),
    ...items,
    ...array.slice(index + 1)
  ]

  const canAddNew = !arrayValue.includes('')

  const handleAddNew = () => {
    currentIdx.current = arrayValue.length
    onUpdate({ value: [...arrayValue, newItemValue] })
  }

  const remove = (array, index) => [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ]

  const handleRemove = (idx) => {
    currentIdx.current = 0
    const newArray = removeArrayItem(arrayValue, idx)
    onUpdate({ value: newArray })
  }

  const handleUpdate = (idx, val) => {
    currentIdx.current = idx
    onUpdate({ value: replace(arrayValue, idx, val) })
  }

  return (
    <ScListLabel {...labelProps}>
      <SnowPaper>
        <FlatListView id={code} aria-label="flat-list">
          {Array.isArray(arrayValue) &&
            arrayValue.map((strValue, idx) => (
              <FlatListItemView key={`${idx}-${JSON.stringify(strValue)}`}>
                <FlatListFieldView>
                  {hasOptions ? (
                    <ScComboField
                      code={`${code}-${idx}`}
                      value={strValue}
                      variant={variant}
                      meta={{
                        options: getAvailableOptions(strValue, arrayValue, meta)
                      }}
                      updateDelay={updateDelay}
                      onUpdate={({ value }) => handleUpdate(idx, value)}
                      focused={idx === currentIdx.current}
                      fieldFontProps={fieldFontProps}
                    />
                  ) : (
                    <ScTextField
                      code={`${code}-${idx}`}
                      value={strValue}
                      meta={meta}
                      updateDelay={updateDelay}
                      onUpdate={({ value }) => handleUpdate(idx, value)}
                      focused={idx === currentIdx.current}
                      fieldFontProps={fieldFontProps}
                    />
                  )}
                </FlatListFieldView>
                <ScClearButton onClear={() => handleRemove(idx)} />
              </FlatListItemView>
            ))}
          {canAddNew && (
            <FlatListButtonBoxView>
              <ScAddListItemButton
                inputProps={{ 'data-testid': 'add-buton' }}
                onClick={handleAddNew}
              />
            </FlatListButtonBoxView>
          )}
        </FlatListView>
      </SnowPaper>
    </ScListLabel>
  )
}

export default ScFlatValuesListField

ScFlatValuesListField.propTypes = {
  value: PropTypes.array,

  labelFontProps: PropTypes.object,
  fieldFontProps: PropTypes.object,

  label: PropTypes.string,
  code: PropTypes.string,

  updateDelay: PropTypes.number,

  isGroupField: PropTypes.bool,
  isInvalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,

  labelPlacement: PropTypes.oneOf(['top', 'start', 'end', '']),
  variant: PropTypes.oneOf(['standard', 'outlined']),

  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  meta: PropTypes.oneOfType([
    PropTypes.shape({
      options: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object)
      ])
    }),
    PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object),
      optionsDev: PropTypes.object
    })
  ]),

  onUpdate: PropTypes.func
}
