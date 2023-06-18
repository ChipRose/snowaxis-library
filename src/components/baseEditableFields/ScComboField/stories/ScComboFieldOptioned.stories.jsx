import React from 'react'

import { argTypes } from './argTypes'
import { getOptions, getValue } from '../../../../mocks'
import { ScComboField } from '../ScComboField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScComboField/Optioned',
  component: ScComboField,
  argTypes,
  args: {
    value: getValue(),
    placeholder: 'Type or choose some options',
    labelPlacement: 'start',
    code: 'combo-field'
  }
}

const Template = (args) => <ScComboField {...args} />

export const SimpleOptioned = Template.bind({})
SimpleOptioned.args = {
  label: 'Simple meta',
  value: getValue('simple'),
  meta: {
    options: getOptions()
  }
}

export const ObjectOptioned = Template.bind({})
ObjectOptioned.args = {
  label: 'Object meta',
  meta: {
    options: getOptions('object')
  }
}

export const ArrayOptioned = Template.bind({})
ArrayOptioned.args = {
  label: 'Objects array meta',
  meta: {
    options: getOptions('array')
  }
}

export const CustomOptioned = Template.bind({})
CustomOptioned.args = {
  label: 'Custom meta',
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
