import React, { useEffect, useState } from 'react'
import { ScCheckboxField } from '../../baseEditableFields'
import {
  SnowTableHead,
  SnowTableRow,
  SnowTableCell,
  SnowTableBody,
  SnowTable
} from '../../../adapter'
import styled, { css } from 'styled-components'
// import { TableColumnTitleView, TableRowContentView } from '../../../domains/app/App/_styled/TableContentView'

/**
 * Simple Table v0.0.1 is used to display table of {dataRows} data with
 * {fieldList} columns and react {onRowClick} for clicked row doesn't provide
 * any special controls
 * @param fieldsList
 * @param dataRows
 * @param onRowClick
 * @returns {JSX.Element}
 * @constructor
 */

const TableColumnTitleView = css`
  ${({ theme }) => `
    color: ${theme.mainPalette.typography.mainDark};
    font-weight: ${theme.fontWeight.main};
    font-size: ${theme.fontSize.secondaryTitle};
    text-transform: capitalized;
  `}
`

const TableRowContentView = css`
  ${({ theme }) => `
    color: ${theme.mainPalette.typography.main};
    font-weight: ${theme.fontWeight.thin};
    font-size: ${theme.fontSize.main};
  `}
`
const RowBasicView = css`
  ${({ theme }) => `
  &.MuiTableRow-root{
    border-bottom: ${theme.border.secondary};
    cursor: pointer;
  }
`}
`

const SimpleTableHeadRowView = styled(SnowTableRow)`
  ${RowBasicView}
  &.MuiTableRow-root {
    ${TableColumnTitleView}
  }
  .MuiTableCell-root {
    border: none;
    min-width: 130px;
    white-space: pre-wrap;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    :first-child {
      min-width: 50px;
    }
  }
`

const SimpleTableBodyRowView = styled(SnowTableRow)`
  ${RowBasicView}

  &.MuiTableRow-root {
    ${TableRowContentView}
    :last-child {
      border-bottom: none;
    }
  }
  .MuiTableCell-root {
    border: none;
    white-space: pre;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
  }
`

const getColumnCode = (field) => {
  return typeof field === 'string' ? field : field?.field
}

export const ScSimpleTable = ({
  columns = [],
  items = [],
  noWrap = false,
  preselected = [],
  selectable = false,
  keyField = 'id',
  onRowDblClick = () => null,
  onRowClick = () => null,
  getColumnTitle = (field) => {
    return typeof field === 'string' ? field.replace('_', ' ') : field?.headerName||field?.field
  },
  getRenderedValue,
  ...props
}) => {
  const [selectedIds, setSelectedIds] = useState(null)

  const handleRowClick = (item) => {
    onRowClick(item)
  }
  const handleRowDblClick = (item) => {
    onRowDblClick(item)
  }

  useEffect(() => {
    if (!Array.isArray(preselected)) return
    setSelectedIds(preselected)
  }, [])

  const hasItems = !!items?.length
  if (!Array.isArray(columns)) return

  const _getRenderedValue = (row, field) => {
    if (typeof getRenderedValue === 'function')
      return getRenderedValue(row, field)
    if (typeof field === 'string') return row[field]
    if (typeof field?.renderer === 'function') return field.renderer(row)
    const _code = getColumnCode(field)
    if (typeof field?.field === 'string') return row[_code]
    return ''
  }

  return (
    <SnowTable>
      <SnowTableHead>
        <SimpleTableHeadRowView>
          {selectable ? <SnowTableCell /> : null}
          {columns?.map((field) => (
            <SnowTableCell
              key={getColumnCode(field)}
              sx={{ textTransform: 'capitalize' }}
            >
              {getColumnTitle(field)}
            </SnowTableCell>
          ))}
        </SimpleTableHeadRowView>
      </SnowTableHead>
      {hasItems && (
        <SnowTableBody>
          {items?.map((item, index) => (
            <SimpleTableBodyRowView
              hover
              key={`${index}`}
              onClick={() => handleRowClick(item)}
              onDoubleClick={() => handleRowDblClick(item)}
              {...(selectedIds?.includes(item[keyField]) && { selected: true })}
            >
              {selectable && (
                <SnowTableCell>
                  <ScCheckboxField
                    value={selectedIds?.includes(item[keyField])}
                    height={'auto'}
                    onUpdate={({ value }) => {}}
                  />
                </SnowTableCell>
              )}
              {columns.map((field) => (
                <SnowTableCell
                  key={getColumnCode(field)}
                  nowrap={noWrap ? 1 : 0}
                >
                  <>{_getRenderedValue(item, field)}</>
                </SnowTableCell>
              ))}
            </SimpleTableBodyRowView>
          ))}
        </SnowTableBody>
      )}
    </SnowTable>
  )
}

export default ScSimpleTable
