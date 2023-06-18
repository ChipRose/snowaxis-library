import React from 'react'
import {
  SnowTableRow,
  SnowTableCell,
  SnowFilterAltOffIcon,
  SnowTypography
} from '../../../adapter'
import { ScFabButton, ScIconButton } from '../../buttons'
import { ScGeneralField } from '../../baseEditableFields'
import styled from 'styled-components'

const VirtualTableHeaderCellView = styled(SnowTableCell).attrs({
  size: 'small'
})`
  ${({ theme }) => `
    background: ${theme.mainPalette.grey.light};
    `}
  &.MuiTableCell-root {
    display: flex;
    align-items: center;
    border-bottom: none;
    padding: 8px;
    box-sizing: border-box;
    ${({ minwidth }) => (minwidth ? `min-width:${minwidth};` : '')}
    ${({ width }) => `
      width: ${width};
    `}
  }
`

const VirtualTableHeaderRowView = styled(SnowTableRow)`
  &.MuiTableRow-root {
    min-width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

const ScVirtualTableHeader = ({
  columns,
  isEditable,
  isFiltrable,
  isSelectable,
  hasNewItem,
  handleAddNew,
  filters,
  handleFilterClear
}) => {
  const handleFilterChange = ({ value, ...props }) => {
    const { code } = props
    const { onFilter } = columns.filter((column) => column.field === code)[0]
    typeof onFilter === 'function' && onFilter({ value, ...props })
  }

  return (
    <VirtualTableHeaderRowView>
      {isEditable || isSelectable ? (
        <VirtualTableHeaderCellView width={'56px'}>
          {!hasNewItem && isEditable ? (
            <ScFabButton onClick={handleAddNew} />
          ) : null}
        </VirtualTableHeaderCellView>
      ) : null}
      {columns.length
        ? columns.map(
            (
              { field, width, headerName, headerFieldType, headerOptions },
              index
            ) => {
              const _width = width ? width : `${100 / columns.length}%`
              return (
                <VirtualTableHeaderCellView
                  key={field}
                  width={_width}
                  minwidth={'170px'}
                >
                  {isFiltrable && isEditable ? (
                    <ScGeneralField
                      value={filters?.[field]}
                      labelPlacement={'top-big'}
                      label={headerName || field}
                      edit={true}
                      labelFontProps={{ fontWeight: '500', fontSize: '18px' }}
                      placeholder={'search'}
                      tooltipNewValue={false}
                      tooltip={`Type ${headerName || field} for search`}
                      disableIndicatorNewValue={true}
                      code={field}
                      onUpdate={handleFilterChange}
                      meta={{
                        editType: headerFieldType ? headerFieldType : 'combo',
                        options: headerOptions
                      }}
                    />
                  ) : (
                    <SnowTypography fontWeight={400}>
                      {headerName || field}
                    </SnowTypography>
                  )}
                </VirtualTableHeaderCellView>
              )
            }
          )
        : null}
      {isEditable ? (
        <VirtualTableHeaderCellView width={'56px'}>
          {isFiltrable ? (
            <ScIconButton
              size={40}
              onClick={handleFilterClear}
              tooltip={'Clear filters'}
            >
              <SnowFilterAltOffIcon />
            </ScIconButton>
          ) : null}
        </VirtualTableHeaderCellView>
      ) : null}
    </VirtualTableHeaderRowView>
  )
}

export default ScVirtualTableHeader
