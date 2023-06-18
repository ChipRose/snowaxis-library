import { SnowTypography } from '../../adapter'
import { ScItemsInRow } from '../../components/layout'
import { ScComboField, ScDropdownField, ScMultiComboField, ScTextField } from '../../components/baseEditableFields'

const simpleContent = {
  title: "Your changes aren't saved",
  content: (
    <SnowTypography variant="body2">
      Changes will be lost on the channel switch. Do you want to continue?
    </SnowTypography>
  )
}

const editableRowContent = {
  title: "Modal title",
  content: (
    <ScItemsInRow itemWidth={50} justifyContent='space-between'>
      <ScComboField label='Combo field' />
      <ScDropdownField label='Dropdown field' />
      <ScTextField label='Text field' />
      <ScMultiComboField label='Multicombo field' />
    </ScItemsInRow>
  )
}

const fieldsRow = (
    <ScItemsInRow ScItemsInRow itemWidth = { 50} justifyContent = 'space-between' >
      <ScComboField label='Combo field'/>
      <ScDropdownField label='Dropdown field'/>
    </ScItemsInRow >
)

const contentList = {
  'simple': simpleContent,
  'editable-row': editableRowContent,
  'fields-row': fieldsRow
}

export const getContent = (type = 'simple') => {
  return contentList[type]
}