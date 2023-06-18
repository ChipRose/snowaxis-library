import React, { useRef, useState, useEffect } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import {
  SnowTable,
  SnowTableBody,
  SnowTableContainer,
  SnowTableHead,
  SnowTableRow,
  SnowPaper,
  SnowTypography,
  SnowBox,
  SnowVerticalAlignBottomRoundedIcon
} from '../../../adapter'
import { ScIconButton } from '../../buttons'
import ScVirtualTableRow from './ScVirtualTableRow'
import ScVirtualTableHeader from './ScVirtualTableHeader'
import { filtrateList } from '../../../util'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const VirtualTableRowView = styled(SnowTableRow)`
  cursor: pointer;
  display: block;
  background: ${({ theme }) => theme.mainPalette.color.contrast};
  :hover {
    .MuiTableCell-root {
      background: ${({ theme }) => theme.mainPalette.grey[50]};
    }
  }
`

const VirtualTableTitleView = styled(SnowBox)`
  padding: 6px 16px;
  display: flex;
  justify-content: space-between;
`

const VirtualTableContainerView = styled(SnowTableContainer)`
  div[data-viewport-type='element'] {
    width: auto !important;
    min-width: 100% !important;
  }
`

const hasNewItem = (shownList) => {
  return Boolean(shownList?.find(({ id }) => id === ''))
}

const TableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <VirtualTableContainerView component={SnowBox} {...props} ref={ref} />
  )),
  Table: (props) => (
    <SnowTable
      {...props}
      sx={{ borderCollapse: 'separate', display: 'block' }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <SnowTableHead
      sx={{ display: 'block', minWidth: '100%' }}
      {...props}
      ref={ref}
    />
  )),
  TableRow: ({ item: _item, ...props }) => {
    return <VirtualTableRowView sx={{ display: 'block' }} {...props} />
  },
  TableBody: React.forwardRef((props, ref) => (
    <SnowTableBody sx={{ display: 'block' }} {...props} ref={ref} />
  ))
}

export const ScVirtualTable = ({
  tableTitle = '',
  items = [],
  tableHeight = '600px',
  isEditable = false,
  isFiltrable = false,
  isCollapsible = false,
  isSelectable = false,
  columns = [{ field: '', width: '' }],
  newItemId = '',
  collapsibleRender = (collapsibleContent = 'default') => <p>{'default'}</p>,
  onCreateItem = () => null,
  onDeleteItem = () => null,
  onUpdateItem = () => null
}) => {
  const virtuoso = useRef(null)
  const [shownList, setShownList] = useState()
  const [filters, setFilters] = useState({})

  const createNewItem = (item) => {
    const entries = Object.keys(item).map((_key) => [
      _key,
      _key === 'id' ? newItemId : ''
    ])
    return Object.fromEntries(entries)
  }

  const handleAddNew = () => {
    const newItem = items[0] ? createNewItem(items[0]) : {}
    setShownList((list) => [newItem, ...list])
  }

  const handleFilter = ({ code, value }) => {
    setFilters((applied) => ({ ...applied, [code]: value }))
  }

  const handleFilterClear = () => {
    setFilters({})
  }

  const handleUpdate = (item) => {
    onUpdateItem({
      ...item
    })
  }

  const handleCreate = (item) => {
    setShownList((list) => [...list.filter(({ id }) => id !== newItemId)])

    onCreateItem({
      ...item,
      id: items[items.length - 1]?.id + 1
    })
  }

  const handleRemove = ({ id: removeId }) => {
    onDeleteItem({ id: removeId })
  }

  const handleEdit = ({ id }) => {}

  useEffect(() => {
    setShownList(filtrateList({ list: items, filters }))
  }, [items])

  useEffect(() => {
    filters && setShownList(filtrateList({ list: items, filters }))
  }, [filters])

  return (
    <SnowPaper sx={{ overflow: 'hidden' }}>
      {tableTitle ? (
        <VirtualTableTitleView>
          <SnowTypography component={'h3'} fontSize={'20px'} fontWeight={500}>
            {tableTitle}
          </SnowTypography>
          <ScIconButton
            tooltip={'Scroll to the last item'}
            size={30}
            onClick={() => {
              virtuoso.current.scrollToIndex({
                index: items?.length - 1
              })
            }}
          >
            <SnowVerticalAlignBottomRoundedIcon />
          </ScIconButton>
        </VirtualTableTitleView>
      ) : null}
      <TableVirtuoso
        style={{ height: tableHeight }}
        data={shownList}
        components={TableComponents}
        totalCount={items.length}
        ref={virtuoso}
        fixedHeaderContent={() => (
          <ScVirtualTableHeader
            isFiltrable={isFiltrable}
            isEditable={isEditable}
            isSelectable={isSelectable}
            filters={filters}
            columns={columns.map((column) => ({
              ...column,
              onFilter: handleFilter
            }))}
            hasNewItem={hasNewItem(shownList)}
            handleAddNew={handleAddNew}
            handleFilterClear={handleFilterClear}
          />
        )}
        itemContent={(index, item) => (
          <ScVirtualTableRow
            columns={columns}
            item={item}
            isCollapsible={isCollapsible}
            isSelectable={isSelectable}
            isEditable={isEditable}
            collapsibleRender={collapsibleRender}
            onEdit={handleEdit}
            onCreate={handleCreate}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
          />
        )}
      />
    </SnowPaper>
  )
}

export default ScVirtualTable

ScVirtualTable.propTypes = {
  tableTitle: PropTypes.string,
  tableHeight: PropTypes.string,
  newItemId: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditable: PropTypes.bool,
  isFiltrable: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  isSelectable: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      headerName: PropTypes.string,
      width: PropTypes.string,
      fieldType: PropTypes.oneOf([
        'text',
        'number',
        'integer',
        'longtext',
        'image',
        'flat_list',
        'fixed_flat_list',
        'map',
        'fixed_key_map',
        'readonly_key_map',
        '2levels_map_list',
        'date',
        'combo',
        'autocomplete',
        'multicombo',
        'multiselect',
        'boolean',
        'checkbox',
        'date-number',
        'select',
        'dropdown',
        'JSON'
      ]),
      fieldOptions: PropTypes.object,
      headerFieldType: PropTypes.oneOf([
        'text',
        'number',
        'integer',
        'longtext',
        'image',
        'flat_list',
        'fixed_flat_list',
        'map',
        'fixed_key_map',
        'readonly_key_map',
        '2levels_map_list',
        'date',
        'combo',
        'autocomplete',
        'multicombo',
        'multiselect',
        'boolean',
        'checkbox',
        'date-number',
        'select',
        'dropdown',
        'JSON'
      ])
    })
  ),
  collapsibleRender: PropTypes.any,
  onCreateItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onUpdateItem: PropTypes.func
}
