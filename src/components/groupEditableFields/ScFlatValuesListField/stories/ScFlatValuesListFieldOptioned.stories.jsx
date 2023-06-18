import React from 'react'

import { argTypes } from './argTypes'
import { getValue, getOptions } from '../../../../mocks'
import { ScFlatValuesListField } from '../ScFlatValuesListField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScFlatValuesListField/Optioned',
  component: ScFlatValuesListField,
  argTypes,
  args: {
    value: getValue('array-key'),
    label: 'Some important label',
    labelPlacement: 'start',
    code: 'flat-list-code'
  }
}

const Template = (args) => <ScFlatValuesListField {...args} />

export const SimpleOptioned = Template.bind({})
SimpleOptioned.args = {
  value: getValue('array'),
  meta: { options: getOptions() }
}

export const ObjectOptioned = Template.bind({})
ObjectOptioned.args = {
  meta: {
    options: getOptions('object')
  }
}

export const ArrayOptioned = Template.bind({})
ArrayOptioned.args = {
  meta: {
    options: getOptions('array')
  }
}

export const CustomOptioned = Template.bind({})
CustomOptioned.args = {
  meta: {
    options: getOptions('custom'),
    optionsDef: {
      value: 'id',
      label: 'code'
    }
  }
}

SimpleOptioned.storyName = 'Simple'
ObjectOptioned.storyName = 'Object'
ArrayOptioned.storyName = 'Array'
CustomOptioned.storyName = 'Custom'
