import React, { useState } from 'react'

import { argTypes } from './argTypes'
import { getContent } from '../../../../mocks'
import { SnowCheckIcon } from '../../../../adapter'
import { ScConfirmationAlert } from '../ScConfirmationAlert'
import { ScPrimaryBtn } from '../../../buttons'

export default {
  title: 'MODALS/ScConfirmationAlert/Props',
  component: ScConfirmationAlert,
  argTypes,
  args: {},
}

const Template = (args) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ScPrimaryBtn
        onClick={() => setOpen(!open)}
        label={'Click to modal window'}
      />
      <ScConfirmationAlert
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
  message: getContent()
}

export const EditableRowContent = Template.bind({})
EditableRowContent.args = {
  message: getContent('editable-row'),
  width: '600px'
}

export const CustomDesign = Template.bind({})
CustomDesign.args = {
  message: getContent(),
  labelForConfirmBtn: 'Confirm',
  labelForCancelBtn: 'Close',
  icon: <SnowCheckIcon sx={{ fill: 'green' }} />
}

Default.storyName = 'Default'
SimpleContent.storyName = 'Simple content'
EditableRowContent.storyName = 'Editable row content'
CustomDesign.storyName = 'Custom design'
