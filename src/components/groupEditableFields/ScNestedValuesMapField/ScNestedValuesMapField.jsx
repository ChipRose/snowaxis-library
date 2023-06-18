import React, { useEffect, useRef, useState } from 'react'
import {
  SnowDivider,
  SnowList,
  SnowListItem,
  SnowPaper
} from '../../../adapter'
import { ScTextField } from '../../baseEditableFields/'
import { ScFlatValuesMapField } from '../../groupEditableFields'
import { ScAddListItemButton } from '../../buttons'
import { ScListLabel } from '../../layout'
import { pairsToObj, replaceArrayItem } from '../../../util'
import { useMapType } from '../../hooks'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const NestedMapPaperView = styled(SnowPaper)`
  width: 100%;
  .MuiPaper-root {
    min-width: 100%;
  }
`

const NestedMapListView = styled(SnowList)`
  width: 100%;
`

const NestedMapListItemView = styled.li`
  padding: ${({ theme }) => `${theme.indent.main} ${theme.indent.secondary}`};
  box-sizing: border-box;
  min-width: 100%;
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: 30% 1fr;
`

const NestedMapKeyFieldView = styled.div`
  ${({ theme }) => `
    padding-top: ${theme.indent.secondary};
    padding-right: ${theme.indent.secondary};
  `}
  grid-row: 1/2;
  grid-column: 1/2;
  align-self: start;
`

const NestedMapValueFieldView = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
`

export const ScNestedValuesMapField = ({
  fixedKeys = false,
  label = '',
  labelPlacement = 'top',
  inputWidth = '100',
  minWidth='600px',
  isGroupField = false,
  code = '',
  value = { '': { '': '' } },
  required = false,
  readonlyKeys = false,
  onUpdate = () => {},
  updateDelay = 500,
  variant = 'outlined',
  onError = () => {},
  meta = {},
  alertOnNewValue = true,
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
    minWidth,
    isGroupField,
    labelFontProps
  }

  const mapObject = value ?? {}
  const originMapArray = Object.entries(mapObject)
  const [mapArray, setMapArray] = useState(originMapArray)

  const { canAddNew, showNewPair, isValidValue, isInvalidKey } = useMapType({
    code,
    label,
    onError
  })

  const currentPosition = useRef([0, null])

  const [newIndexes, setNewIndexes] = useState([])

  useEffect(() => {
    setMapArray(Object.entries(mapObject))
  }, [value])

  const handleError = (errors) => {
    onError(errors)
  }
  const handleUpdate = ([row, col], val, nestedPosition) => {
    // console.log('Nested handleUpdate')
    showNewPair(false)
    currentPosition.current = [row, nestedPosition]

    const isNewItem = row === mapArray.length
    isNewItem && setNewIndexes([...newIndexes, row])

    const updatedMapArray = isNewItem
      ? [...mapArray, [col === 0 ? val : '', col === 1 ? val : { '': '' }]]
      : replaceArrayItem(
          mapArray,
          row,
          replaceArrayItem(mapArray[row], col, val)
        )
    isValidValue(updatedMapArray)
      ? onUpdate({
          value: pairsToObj(updatedMapArray),
          position: currentPosition.current
        })
      : setMapArray(updatedMapArray)
  }

  const keyIsImmutable = (idx) => fixedKeys && !newIndexes.includes(idx)

  const pairIsFocused = (idx) => {
    return currentPosition.current && idx === currentPosition.current[0]
  }

  const keyIsFocused = (idx) =>
    pairIsFocused(idx) && currentPosition.current[1] === null

  const valueIsFocused = (idx) =>
    pairIsFocused(idx) && currentPosition.current[1] === 1

  return (
    <ScListLabel {...labelProps}>
      <NestedMapPaperView aria-label="nested-map-field">
        <NestedMapListView>
          {Array.isArray(mapArray) &&
            mapArray.map((mapPair, idx) => (
              <NestedMapListItemView
                key={`${idx}-${JSON.stringify(mapPair)}`}
                alignItems={'flex-start'}
              >
                {' '}
                <NestedMapKeyFieldView>
                  <ScTextField
                    code={`${code}-${idx}`}
                    value={mapPair[0]}
                    meta={meta}
                    variant={variant}
                    updateDelay={updateDelay}
                    onUpdate={({ value }) =>
                      handleUpdate([idx, 0], value, null)
                    }
                    disabled={keyIsImmutable(idx)}
                    isInvalid={isInvalidKey(mapPair[0])}
                    focused={keyIsFocused(idx) && !keyIsImmutable(idx)}
                    selected={keyIsFocused(idx)}
                    fieldFontProps={fieldFontProps}
                  />
                </NestedMapKeyFieldView>
                <NestedMapValueFieldView>
                  <ScFlatValuesMapField
                    code={`${code}-value-${idx}`}
                    value={mapPair[1]}
                    updateDelay={updateDelay}
                    meta={meta}
                    fixedKeys={keyIsImmutable(idx)}
                    onError={handleError}
                    variant={variant}
                    readonlyKeys={readonlyKeys}
                    onUpdate={({ value, position }) =>
                      handleUpdate([idx, 1], value, position)
                    }
                    focusedOn={pairIsFocused(idx) && currentPosition.current[1]}
                    fieldFontProps={fieldFontProps}
                  />
                </NestedMapValueFieldView>
              </NestedMapListItemView>
            ))}
          {!canAddNew && (
            <>
              <SnowListItem>
                <SnowDivider sx={{width:'100%'}}/>
              </SnowListItem>
              <NestedMapListItemView>
                <NestedMapKeyFieldView>
                  <ScTextField
                    code={`key-new`}
                    value={''}
                    meta={meta}
                    variant={variant}
                    updateDelay={updateDelay}
                    onUpdate={({ value }) =>
                      handleUpdate([mapArray.length, 0], value, null)
                    }
                    focused={true}
                    fieldFontProps={fieldFontProps}
                  />
                </NestedMapKeyFieldView>
                <NestedMapValueFieldView>
                  <ScFlatValuesMapField
                    code={`value-new`}
                    value={{ '': '' }}
                    meta={meta}
                    variant={variant}
                    onError={handleError}
                    updateDelay={updateDelay}
                    onUpdate={({ value, position }) =>
                      handleUpdate([mapArray.length, 1], value, position)
                    }
                    focusedOn={currentPosition.current[1]}
                    fieldFontProps={fieldFontProps}
                  />
                </NestedMapValueFieldView>
              </NestedMapListItemView>
            </>
          )}
          {canAddNew && <ScAddListItemButton onClick={showNewPair} />}
        </NestedMapListView>
      </NestedMapPaperView>
    </ScListLabel>
  )
}

export default ScNestedValuesMapField

ScNestedValuesMapField.propTypes = {
  label: PropTypes.string,
  code: PropTypes.string,

  fixedKeys: PropTypes.bool,
  required: PropTypes.bool,
  isGroupField: PropTypes.bool,

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

  onError: PropTypes.func,
  onUpdate: PropTypes.func
}
