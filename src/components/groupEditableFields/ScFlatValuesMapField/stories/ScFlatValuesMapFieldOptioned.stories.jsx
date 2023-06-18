import React from 'react'

import { argTypes } from './argTypes'
import { getValue, getOptions } from '../../../../mocks'
import { ScFlatValuesMapField } from '../ScFlatValuesMapField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScFlatValuesMapField/Optioned',
  component: ScFlatValuesMapField,
  argTypes,
  args: {
    value: getValue('object-key'),
    fixedKeys: true,
    label: 'Some important label',
    labelPlacement: 'start',
    code: 'flat-map-field',
  }
}

const Template = (args) => <ScFlatValuesMapField {...args} />

export const SimpleOptioned = Template.bind({})
SimpleOptioned.args = {
  value: getValue('object'),
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
