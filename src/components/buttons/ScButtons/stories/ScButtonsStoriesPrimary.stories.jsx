import React from 'react'

import { argTypes } from './argTypes'
import { ScPrimaryBtn } from '../buttons'

export default {
  title: 'CONTROLS/Buttons/ScPrimaryBtn',
  component: ScPrimaryBtn,
  argTypes,
  args: {
    label: 'primary button',
  }
}

const Template = (args) => <ScPrimaryBtn {...args} />

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
