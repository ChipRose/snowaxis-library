import React, { useState } from 'react'

import { argTypes } from './argTypes'
import { ScUploadModal } from '../ScUploadModal'
import { ScPrimaryBtn } from '../../../buttons'

export default {
  title: 'MODALS/ScUploadModal/Props',
  component: ScUploadModal,
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
      <ScUploadModal
        {...args}
        open={open}
        onClose={() => setOpen(!open)}
      />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}


Default.storyName = 'Default'
