import React, { useContext, useState, useEffect } from 'react'
import { SnowTableCell, SnowTypography } from '../../../adapter'
import { ScCrudButton } from '../../buttons'
import { ScGeneralField } from '../../baseEditableFields'
import { ScConfirmationAlert } from '../../modalWindows'
import styled, { ThemeContext } from 'styled-components'
import { Collapse } from '@mui/material'

const VirtualTableBodyCellView = styled(SnowTableCell).attrs({
  component: 'div'
})`
  ${({ width }) => `
    width: ${width};
  `}
  &.MuiTableCell-root {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: ${({ padd }) => (padd ? `16px 8px;` : `8px;`)}
      ${({ minwidth }) => (minwidth ? `min-width: ${minwidth};` : '')};
  }
`

const VirtualTableRowView = styled(SnowTableCell)`
  &.MuiTableCell-root {
    display: flex;
    justify-content: space-between;
    border: none;
  }
`

const VirtualTableCollapsibleRowView = styled(VirtualTableRowView)`
  background: ${({ theme }) => theme.mainPalette.grey[50]};
`

const ScVirtualTableBasicRowCell = (props) => {
  const { item, columns, editState, handleUpdate } = props
  return (
    <>
      {columns.length
        ? columns.map(({ field, width, fieldType, fieldOptions }, index) => {
            const _width = width ? width : `${100 / columns.length}%`
            return (
              <VirtualTableBodyCellView
                key={index}
                width={_width}
                padd={editState ? 1 : 0}
                minwidth={'170px'}
              >
                <ScGeneralField
                  edit={editState}
                  value={item[field]}
                  code={field}
                  onUpdate={handleUpdate}
                  meta={{
                    editType: fieldType ? fieldType : 'text',
                    options: fieldOptions
                  }}
                />
              </VirtualTableBodyCellView>
            )
          })
        : null}
    </>
  )
}
const ScVirtualTableRow = ({
  columns = [],
  item = {},
  isEditable = false,
  isCollapsible = false,
  isSelectable = false,
  collapsibleRender,
  newItemId = '',
  onEdit = () => null,
  onRemove = () => null,
  onCreate = () => null,
  onUpdate = () => null
}) => {
  const theme = useContext(ThemeContext)
  const [editState, setEditState] = useState(false)
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false)
  const [itemData, setItemData] = useState(item)

  const isNewItem = item.id === newItemId
  const itemLength = isEditable ? columns.length + 2 : columns.length

  const handleUpdate = ({ code, value }) => {
    const updateItem = (applied) => ({ ...applied, [code]: value })
    setItemData(updateItem)
  }

  const handleEdit = () => {
    onEdit && onEdit(itemData)
    setEditState(true)
  }

  const handleSave = () => {
    handleCreate()
    onUpdate && onUpdate(itemData)
    setEditState(false)
  }

  const handleRemove = () => {
    onRemove && onRemove(itemData)
    setEditState(false)
    handleCloseRemoveDialog()
  }

  const handleOpenRemoveDialog = () => {
    setOpenRemoveDialog(true)
  }
  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false)
  }

  const handleCreate = () => {
    isNewItem && onCreate && onCreate(itemData)
  }

  useEffect(() => {
    setItemData(item)
    isNewItem && setEditState(true)
  }, [item])

  return (
    <>
      <VirtualTableRowView colSpan={itemLength.toString()} padding={'none'}>
        {isEditable && openRemoveDialog ? (
          <ScConfirmationAlert
            open={openRemoveDialog}
            message={{
              title: 'Delete item',
              content: (
                <SnowTypography align="center">
                  Are you sure you want to delete this item?
                </SnowTypography>
              )
            }}
            onClose={handleCloseRemoveDialog}
            onConfirm={handleRemove}
          />
        ) : null}
        {isEditable || isSelectable ? (
          <VirtualTableBodyCellView width={'56px'}>
            {isEditable && !isSelectable && (
              <ScCrudButton
                editMode={editState}
                onEdit={handleEdit}
                onSave={handleSave}
                size={40}
                color={theme.mainPalette.color.secondary}
              />
            )}
            {isSelectable && !isEditable && (
              <ScGeneralField meta={{ editType: 'checkbox' }} edit={true} />
            )}
          </VirtualTableBodyCellView>
        ) : null}
        <ScVirtualTableBasicRowCell
          item={item}
          columns={columns}
          editState={editState}
          isCollapsible={isCollapsible}
          handleUpdate={handleUpdate}
        />
        {isEditable ? (
          <VirtualTableBodyCellView width={'56px'}>
            <ScCrudButton
              editMode={true}
              onRemove={handleOpenRemoveDialog}
              size={40}
              color={theme.mainPalette.color.secondary}
            />
          </VirtualTableBodyCellView>
        ) : null}
      </VirtualTableRowView>
      {isCollapsible ? (
        <VirtualTableCollapsibleRowView
          colSpan={itemLength.toString()}
          padding={editState ? 'normal' : 'none'}
        >
          <Collapse
            in={editState}
            timeout="auto"
            unmountOnExit
            sx={{ width: '100%' }}
          >
            {collapsibleRender({
              ...item?.collapsible,
              id: item?.id,
              editState,
              handleUpdate
            })}
          </Collapse>
        </VirtualTableCollapsibleRowView>
      ) : null}
    </>
  )
}

export default ScVirtualTableRow
