import React from 'react'

import { argTypes } from './argTypes'
import { ScSecondaryBtn } from '../buttons'

export default {
  title: 'CONTROLS/Buttons/ScSecondaryBtn',
  component: ScSecondaryBtn,
  argTypes,
  args: {
    label: 'secondary button',
  }
}

const Template = (args) => <ScSecondaryBtn {...args} />

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
