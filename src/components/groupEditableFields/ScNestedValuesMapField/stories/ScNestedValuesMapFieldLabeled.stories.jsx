import React from 'react'

import { argTypes } from './argTypes'
import { getValue } from '../../../../mocks'
import { ScNestedValuesMapField } from '../ScNestedValuesMapField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScNestedValuesMapField/Labeled',
  component: ScNestedValuesMapField,
  argTypes,
  args: {
    label: 'Some important label',
    value: getValue('nested-object'),
    code: 'nested-map-field'
  }
}

const Template = (args) => <ScNestedValuesMapField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithStartLabel = Template.bind({})
WithStartLabel.args = {
  labelPlacement: 'start'
}

export const WithEndLabel = Template.bind({})
WithEndLabel.args = {
  labelPlacement: 'end'
}

Default.storyName = 'Default label'
WithStartLabel.storyName = 'Start label'
WithEndLabel.storyName = 'End label'
