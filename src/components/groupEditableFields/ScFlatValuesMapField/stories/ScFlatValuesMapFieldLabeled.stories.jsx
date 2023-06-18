import React from 'react'

import { argTypes } from './argTypes'
import { getValue } from '../../../../mocks'
import { ScFlatValuesMapField } from '../ScFlatValuesMapField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScFlatValuesMapField/Labeled',
  component: ScFlatValuesMapField,
  argTypes,
  args: {
    label: 'Some important label',
    value: getValue('object'),
    code: 'flat-map-field',
  }
}

const Template = (args) => <ScFlatValuesMapField {...args} />

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
