import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SnowList, SnowListItem, SnowPaper } from '../../../adapter/'
import { ScTextField, ScDropdownField } from '../../baseEditableFields'
import { ScClearButton, ScAddListItemButton } from '../../buttons'
import { ScListLabel } from '../../layout'
import { pairsToObj, removeArrayItem, replaceArrayItem } from '../../../util'
import { useMapType } from '../../hooks'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FlatMapPaperView = styled(SnowPaper)`
  width: 100%;
  .MuiPaper-root {
    min-width: 100%;
  }
`

const FlatMapListItem = styled.li`
    padding: ${({ theme }) => `${theme.indent.main} ${theme.indent.secondary}`};
    box-sizing: border-box;
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-rows: min-content;
    grid-template-columns: 1fr 1fr 40px;
`

const FlatMapKeyFieldView = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-right: ${({ theme }) => theme.indent.main};
  grid-row: 1/2;
  grid-column: 1/2;
`

const FlatMapValueFieldView = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-left: ${({ theme }) => theme.indent.main};
  grid-row: 1/2;
  grid-column: 2/3;
`

const FlatMapClearButtonBoxView = styled.div`
  grid-row: 1/2;
  grid-column: 3/4;
`

export const ScFlatValuesMapField = ({
  fixedKeys = false,
  readonlyKeys = false,
  code = '',
  value = {}, //mapObject
  required = false,
  options = [],
  onUpdate,
  updateDelay = 500,
  onError = () => {},
  meta = {},
  alertOnNewValue = true,
  focusedOn, //used for nested map
  viewOnly = false,
  isGroupField = false,
  variant = 'outlined',
  label = '',
  labelPlacement = 'top',
  inputWidth = '100',
  labelFontProps = { fontWeight: '', fontSize: '' },
  fieldFontProps = { fontWeight: '', fontSize: '' },
  ...props
}) => {
  const labelProps = {
    required,
    code,
    label,
    labelPlacement,
    inputWidth,
    isGroupField,
    labelFontProps,
  }

  const mapObject = value ?? {}
  const getAvailableOptions = useCallback(
    (mapObject) =>
      options.filter((option) => !Object.keys(mapObject).includes(option)),
    [mapObject]
  )

  const originMapArray = Object.entries(mapObject)
  const [mapArray, setMapArray] = useState(originMapArray)

  const [availableOptions, setAvailableOptions] = useState(
    getAvailableOptions(mapObject)
  )

  const { canAddNew, showNewPair, isValidValue, isInvalidKey } = useMapType({
    code,
    label,
    onError
  })
  const currentPosition = useRef()

  if (focusedOn) currentPosition.current = focusedOn

  const showNewItem = () => {
    showNewPair(true)
    currentPosition.current = [mapArray.length, 0]
  }

  const [newIndexes, setNewIndexes] = useState([])

  useEffect(() => {
    const mapObject = value ?? {}
    setAvailableOptions(getAvailableOptions(mapObject))
    setMapArray(Object.entries(mapObject))
  }, [value])

  const handleUpdate = ([row, col], val) => {
    showNewPair(false)
    currentPosition.current = [row, col]
    const isNewItem = row === mapArray.length
    isNewItem && setNewIndexes([...newIndexes, row])
    const updatedMapArray = isNewItem
      ? [...mapArray, [col === 0 ? val : '', col === 1 ? val : '']]
      : replaceArrayItem(
          mapArray,
          row,
          replaceArrayItem(mapArray[row], col, val)
        )
    const isValid = isValidValue(updatedMapArray)

    setAvailableOptions(getAvailableOptions(pairsToObj(updatedMapArray)))
    isValid
      ? onUpdate({
          value: pairsToObj(updatedMapArray),
          position: [row, col]
        })
      : setMapArray(updatedMapArray)
  }

  const handleRemove = (idx) => {
    const newArray = removeArrayItem(mapArray, idx)
    onUpdate({
      value: pairsToObj(newArray),
      position: [0, 0]
    })
  }

  //if we have fixed keys field and map line idx isn't new map line fields
  const keyIsImmutable = (idx) => fixedKeys && !newIndexes.includes(idx)

  const keyIsReadonly = () => readonlyKeys

  const pairIsFocused = (idx) => {
    return currentPosition.current && idx === currentPosition.current[0]
  }

  const keyIsFocused = (idx) =>
    pairIsFocused(idx) && currentPosition.current[1] === 0

  const valueIsFocused = (idx) =>
    pairIsFocused(idx) && currentPosition.current[1] === 1
  return (
    <ScListLabel {...labelProps}>
      <FlatMapPaperView aria-label="flat-map-list">
        <SnowList>
          {Array.isArray(mapArray) &&
            mapArray.map(([hashKey, hashValue], idx) => (
              <FlatMapListItem key={idx}>
                <FlatMapKeyFieldView>
                  {fixedKeys ? (
                    <ScDropdownField
                      options={[...availableOptions, hashKey]}
                      code={`${code}-${idx}`}
                      value={hashKey}
                      {...(isInvalidKey(hashKey) && { isInvalid: true })}
                      meta={meta}
                      updateDelay={500}
                      variant={variant}
                      onUpdate={({ value }) => handleUpdate([idx, 0], value)}
                      focused={keyIsFocused(idx)}
                      selected={keyIsFocused(idx)}
                      fieldFontProps={fieldFontProps}
                    />
                  ) : (
                    <ScTextField
                      code={`${code}-${idx}`}
                      value={hashKey}
                      {...(isInvalidKey(hashKey) && { isInvalid: true })}
                      meta={meta}
                      variant={variant}
                      updateDelay={500}
                      disabled={keyIsImmutable(idx) || readonlyKeys}
                      onUpdate={({ value }) => handleUpdate([idx, 0], value)}
                      focused={keyIsFocused(idx) && !keyIsImmutable(idx)}
                      selected={keyIsFocused(idx)}
                      fieldFontProps={fieldFontProps}
                    />
                  )}
                </FlatMapKeyFieldView>
                <FlatMapValueFieldView>
                  <ScTextField
                    code={`${code}-value-${idx}`}
                    value={hashValue}
                    meta={meta}
                    updateDelay={500}
                    variant={variant}
                    onUpdate={({ value }) => handleUpdate([idx, 1], value)}
                    focused={valueIsFocused(idx)}
                    fieldFontProps={fieldFontProps}
                  />
                </FlatMapValueFieldView>
                {!readonlyKeys && (
                  <FlatMapClearButtonBoxView>
                    <ScClearButton onClear={() => handleRemove(idx)} />
                  </FlatMapClearButtonBoxView>
                )}
              </FlatMapListItem>
            ))}
          {!canAddNew && (
            <FlatMapListItem>
              <FlatMapKeyFieldView>
                {fixedKeys ? (
                  <ScDropdownField
                    options={availableOptions}
                    code={`key-new`}
                    value={''}
                    meta={meta}
                    variant={variant}
                    updateDelay={500}
                    onUpdate={({ value }) =>
                      handleUpdate([mapArray.length, 0], value)
                    }
                    focused={true}
                    fieldFontProps={fieldFontProps}
                  />
                ) : (
                  <ScTextField
                    code={`key-new`}
                    value={''}
                    meta={meta}
                    updateDelay={updateDelay}
                    variant={variant}
                    disabled={readonlyKeys}
                    onUpdate={({ value }) =>
                      handleUpdate([mapArray.length, 0], value)
                    }
                    focused={true}
                    fieldFontProps={fieldFontProps}
                  />
                )}
              </FlatMapKeyFieldView>
              <FlatMapValueFieldView>
                <ScTextField
                  code={`value-new`}
                  value={''}
                  meta={meta}
                  variant={variant}
                  updateDelay={updateDelay}
                  onUpdate={({ value }) =>
                    handleUpdate([mapArray.length, 1], value)
                  }
                  fieldFontProps={fieldFontProps}
                />
              </FlatMapValueFieldView>
            </FlatMapListItem>
          )}
          {!readonlyKeys && canAddNew && (
            <ScAddListItemButton onClick={showNewItem} />
          )}
        </SnowList>
      </FlatMapPaperView>
    </ScListLabel>
  )
}

export default ScFlatValuesMapField

ScFlatValuesMapField.propTypes = {
  label: PropTypes.string,
  code: PropTypes.string,

  fixedKeys: PropTypes.bool,
  readonlyKeys: PropTypes.bool,
  required: PropTypes.bool,

  value: PropTypes.object,
  labelFontProps: PropTypes.object,
  fieldFontProps: PropTypes.object,

  updateDelay: PropTypes.number,

  variant: PropTypes.oneOf(['standard', 'outlined']),
  labelPlacement: PropTypes.oneOf(['top', 'start', 'end', '']),

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

  onUpdate: PropTypes.func,
  onError: PropTypes.func
}
