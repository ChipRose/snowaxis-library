import React from 'react'

import { argTypes } from './argTypes'
import { getOptions, getValue } from '../../../../mocks'
import { ScFlatValuesListField } from '../ScFlatValuesListField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScFlatValuesListField/Props',
  component: ScFlatValuesListField,
  argTypes,
  args: {
    code: 'flat-list-field'
  }
}

const Template = (args) => <ScFlatValuesListField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithEmptyValue = Template.bind({})
WithEmptyValue.args = {
  value: getValue('array-empty')
}

export const WithFontProps = Template.bind({})
WithFontProps.args = {
  label: 'With custom font props',
  labelPlacement: 'start',
  value: getValue('array'),
  fieldFontProps: { fontSize: '20px', fontWeight: '500' },
  labelFontProps: { fontSize: '10px', fontWeight: '500' }
}

export const WithInitValue = Template.bind({})
WithInitValue.args = {
  value: getValue('array')
}

export const OptionedWithInitValue = Template.bind({})
OptionedWithInitValue.args = {
  value: getValue('array'),
  meta: { options: getOptions() }
}

Default.storyName = 'Default'
WithEmptyValue.storyName = 'Empty value'
WithFontProps.storyName = 'Font props'
WithInitValue.storyName = 'With init value'
OptionedWithInitValue.storyName = 'Optioned with init value'
