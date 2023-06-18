import React from 'react'

import { argTypes } from './argTypes'
import { getOptions, getValue } from '../../../../mocks'
import { ScDropdownField } from '../ScDropdownField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDropdownField/Optioned',
  component: ScDropdownField,
  argTypes,
  args: {
    value: getValue(),
    labelPlacement: 'start',
    code: 'select-field'
  }
}

const Template = (args) => <ScDropdownField {...args} />

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
