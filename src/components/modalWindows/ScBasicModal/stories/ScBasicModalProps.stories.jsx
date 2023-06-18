import React, { useState } from 'react'

import { argTypes } from './argTypes'
import { getContent } from '../../../../mocks'
import { ScBasicModal } from '../ScBasicModal'
import { ScPrimaryBtn } from '../../../buttons'

export default {
  title: 'MODALS/ScBasicModal/Props',
  component: ScBasicModal,
  argTypes,
  args: {}
}

const Template = (args) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ScPrimaryBtn
        onClick={() => setOpen(!open)}
        label={'Click to modal window'}
      />
      <ScBasicModal
        {...args}
        open={open}
        onClose={() => setOpen(!open)}
      />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const SimpleContent = Template.bind({})
SimpleContent.args = {
  message: getContent(),
}

export const EditableRowContent = Template.bind({})
EditableRowContent.args = {
  message: getContent('editable-row'),
}

export const FormHeading = Template.bind({})
FormHeading.args = {
  message: getContent('editable-row'),
  headForm: getContent('fields-row')
}

export const CustomDesign = Template.bind({})
CustomDesign.args = {
  message: getContent('editable-row'),
  labelForConfirmBtn: 'Confirm',
  labelForCancelBtn: 'Close',
}

Default.storyName = 'Default'
SimpleContent.storyName = 'Simple content'
EditableRowContent.storyName = 'Editable row content'
FormHeading.storyName = 'Form heading'
CustomDesign.storyName = 'Custom design'
