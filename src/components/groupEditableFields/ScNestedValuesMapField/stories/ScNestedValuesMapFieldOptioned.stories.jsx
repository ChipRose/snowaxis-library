import React from 'react'

import { argTypes } from './argTypes'
import { getValue, getOptions } from '../../../../mocks'
import { ScNestedValuesMapField } from '../ScNestedValuesMapField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScNestedValuesMapField/Optioned',
  component: ScNestedValuesMapField,
  argTypes,
  args: {
    value: getValue('nested-object-key'),
    label: 'Some important label',
    labelPlacement: 'start',
    fixedKeys: true,
    code: 'nested-map-field'
  }
}

const Template = (args) => <ScNestedValuesMapField {...args} />

export const SimpleOptioned = Template.bind({})
SimpleOptioned.args = {
  value: getValue('nested-object'),
  meta: { options: getOptions() }
}

export const ObjectOptioned = Template.bind({})
ObjectOptioned.args = {
  meta: {options: getOptions('object')}
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
