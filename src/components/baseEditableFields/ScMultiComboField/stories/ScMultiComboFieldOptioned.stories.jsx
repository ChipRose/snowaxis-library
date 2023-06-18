import React from 'react'

import { argTypes } from './argTypes'
import { getOptions, getValue } from '../../../../mocks'
import { ScMultiComboField } from '../ScMultiComboField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScMultiComboField/Optioned',
  component: ScMultiComboField,
  argTypes,
  args: {
    placeholder: 'Choose some options',
    labelPlacement: 'start',
    code: 'multi-combo-field'
  }
}

const Template = (args) => <ScMultiComboField {...args} />

export const SimpleOptioned = Template.bind({})
SimpleOptioned.args = {
  label: 'Simple meta',
  meta: {
    options: getOptions()
  }
}

export const SimpleOptionedWithEmpty = Template.bind({})
SimpleOptionedWithEmpty.args = {
  label: 'Simple meta with empty option',
  meta: {
    options: getOptions(),
    emptyOption: 'All'
  }
}

export const ArrayOptioned = Template.bind({})
ArrayOptioned.args = {
  label: 'Array meta',
  meta: {
    options: getOptions('array')
  }
}

export const ArrayOptionedWithEmpty = Template.bind({})
ArrayOptionedWithEmpty.args = {
  label: 'Array meta with empty option',
  meta: {
    options: getOptions('array'),
    emptyOption: { All: 'All' }
  }
}

export const ObjectOptioned = Template.bind({})
ObjectOptioned.args = {
  label: 'Object meta',
  meta: {
    options: getOptions('object')
  }
}

export const ObjectOptionedWithEmpty = Template.bind({})
ObjectOptionedWithEmpty.args = {
  label: 'Object meta with empty option',
  meta: {
    options: getOptions('object'),
    emptyOption: { All: 'All' }
  }
}

export const CustomOptioned = Template.bind({})
CustomOptioned.args = {
  label: 'Custom meta',
  meta: {
    options: getOptions('custom'),
    optionsDef: {
      value: 'id',
      label: 'code',
      tag: 'code'
    }
  }
}

export const CustomOptionedWithEmpty = Template.bind({})
CustomOptionedWithEmpty.args = {
  label: 'Custom meta with empty option',
  meta: {
    options: getOptions('custom'),
    emptyOption: {
      id: 'All',
      code: 'All'
    },
    optionsDef: {
      value: 'id',
      label: 'code',
      tag: 'code'
    }
  }
}

SimpleOptioned.storyName='Simple'
SimpleOptionedWithEmpty.storyName='Simple with empty'
ArrayOptioned.storyName='Array'
ArrayOptionedWithEmpty.storyName='Array with empty'
ObjectOptioned.storyName='Object'
ObjectOptionedWithEmpty.storyName='Object with empty'
CustomOptioned.storyName='Custom'
CustomOptionedWithEmpty.storyName='Custom with empty'
