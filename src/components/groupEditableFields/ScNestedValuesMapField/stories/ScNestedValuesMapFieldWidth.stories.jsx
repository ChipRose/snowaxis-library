import React from 'react'

import { argTypes } from './argTypes'
import { getValue, getOptions } from '../../../../mocks'
import { ScNestedValuesMapField } from '../ScNestedValuesMapField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScNestedValuesMapField/Width',
  component: ScNestedValuesMapField,
  argTypes,
  args: {
    value: getValue('nested-object'),
    code: 'nested-map-field',
    label: 'Some important label',
    meta: { options: getOptions() }
  }
}

const Template = (args) => <ScNestedValuesMapField {...args} />

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
  inputWidth: 50,
}

export const SomeWidthStart = Template.bind({})
SomeWidthStart.args = {
  label: '50% input width',
  labelPlacement: 'start',
  inputWidth: 50
}

export const SomeWidthStartGroup = Template.bind({})
SomeWidthStartGroup.args = {
  label: '80% input width in group',
  labelPlacement: 'start',
  isGroupField: true,
  inputWidth: 80
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
SomeWidthStartGroup.storyName = 'Group fields (start label)'
SomeWidthEnd.storyName = 'Width in % (end label)'
