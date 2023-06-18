import React from "react";

import { argTypes } from './argTypes';
import { ScCheckboxField } from '../ScCheckboxField';

export default {
  title: 'EDITABLE FIELDS/Base field/ScCheckboxField/Width',
  component: ScCheckboxField,
  argTypes: argTypes,
  args: {
    label: 'Some important label',
    labelPlacement: 'start',
    placeholder: 'type some value',
    code: 'text-field',
  }
};

const Template = (args) => <ScCheckboxField {...args} />

export const AutoWidthTop = Template.bind({})
AutoWidthTop.args = {
  labelPlacement: 'top',
  inputWidth: 'auto'
}

export const AutoWidthStart = Template.bind({})
AutoWidthStart.args = {
  labelPlacement: 'start',
  inputWidth: 'auto'
}

export const AutoWidthEnd = Template.bind({})
AutoWidthEnd.args = {
  labelPlacement: 'end',
  inputWidth: 'auto'
}

export const SomeWidthStart = Template.bind({})
SomeWidthStart.args = {
  label: '50% input width',
  labelPlacement: 'start',
  isGroupField: true,
  inputWidth: 70
}

export const SomeWidthEnd = Template.bind({})
SomeWidthEnd.args = {
  label: '50% input width',
  labelPlacement: 'end',
  inputWidth: 50
}

AutoWidthTop.storyName = 'Auto (top label)'
AutoWidthStart.storyName = 'Auto (start label)'
AutoWidthEnd.storyName = 'Auto (end label)'
SomeWidthStart.storyName = 'Width in % (start label)'
SomeWidthEnd.storyName = 'Width in % (end label)'
