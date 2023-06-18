import React from 'react'

import { argTypes } from './argTypes'
import { getValue } from '../../../../mocks'
import { ScFlatValuesListField } from '../ScFlatValuesListField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScFlatValuesListField/Labeled',
  component: ScFlatValuesListField,
  argTypes,
  args: {
    label: 'Some important label',
    value: getValue('array'),
    code: 'flat-list-code'
  }
}

const Template = (args) => <ScFlatValuesListField {...args} />

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
