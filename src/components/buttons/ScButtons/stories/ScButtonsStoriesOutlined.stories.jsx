import React from 'react'

import { argTypes } from './argTypes'
import { ScOutlinedBtn } from '../buttons'

export default {
  title: 'CONTROLS/Buttons/ScOutlinedBtn',
  component: ScOutlinedBtn,
  argTypes,
  args: {
    label: 'outlined button'
  }
}

const Template = (args) => <ScOutlinedBtn {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const Sized = Template.bind({})
Sized.args = {
  size: 'small'
}
