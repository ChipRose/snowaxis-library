import React from 'react'

import { argTypes } from './argTypes'
import { getOptions } from '../../../../mocks'
import { ScDropdownField } from '../ScDropdownField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDropdownField/Width',
  component: ScDropdownField,
  argTypes,
  args: {
    label: 'Some important label',
    labelPlacement: 'start',
    code: 'select-field',
    meta: { options: getOptions() }
  }
}

const Template = (args) => <ScDropdownField {...args} />

export const AutoWidthTop = Template.bind({})
AutoWidthTop.args = {
  labelPlacement: 'top',
  inputWidth: 'auto'
}

export const AutoWidthStart = Template.bind({})
AutoWidthStart.args = {
  labelPlacement: 'start',
  inputWidth: 'auto'
}

export const AutoWidthEnd = Template.bind({})
AutoWidthEnd.args = {
  labelPlacement: 'end',
  inputWidth: 'auto'
}

export const SomeWidthTop = Template.bind({})
SomeWidthTop.args = {
  label: '50% input width',
  labelPlacement: 'top',
  inputWidth: 50
}

export const SomeWidthStart = Template.bind({})
SomeWidthStart.args = {
  label: '50% input width',
  labelPlacement: 'start',
  inputWidth: 50
}

export const SomeWidthEnd = Template.bind({})
SomeWidthEnd.args = {
  label: '50% input width',
  labelPlacement: 'end',
  inputWidth: 50
}

AutoWidthTop.storyName = 'Auto (top label)'
AutoWidthStart.storyName = 'Auto (start label)'
AutoWidthEnd.storyName = 'Auto (end label)'
SomeWidthTop.storyName = 'Width in % (top label)'
SomeWidthStart.storyName = 'Width in % (start label)'
SomeWidthEnd.storyName = 'Width in % (end label)'
