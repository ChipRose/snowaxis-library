import React from 'react'
import { withRecoilFlow } from 'storybook-addon-recoil-flow/dist/decorator'

import { getOptions, getValue } from '../../../../mocks'
import { ScGeneralField } from '../ScGeneralField'
import FieldsGroup from './decorators'

export default {
  title: 'EDITABLE FIELDS/Base field/ScGeneralField/Examples',
  component: ScGeneralField,
  decorators: [withRecoilFlow],
  parameters: {
    docs: {
      story: { iframeHeight: 1000 }
    }
  }
}

const fieldsArgsList = [
  {
    meta: { editType: 'text' },
    value: getValue('simple'),
    label: 'text',
    key: 'text'
  },
  {
    meta: { editType: 'longtext' },
    value: getValue('simple-long'),
    label: 'longtext',
    key: 'longtext'
  },
  {
    meta: { editType: 'date' },
    value: getValue('simple-date'),
    label: 'date',
    key: 'date'
  },
  {
    meta: {
      editType: 'combo',
      options: getOptions('simple')
    },
    value: getValue('simple'),
    label: 'combo',
    key: 'combo'
  },
  {
    meta: {
      editType: 'multiselect',
      options: getOptions(),
      optionsDef: {}
    },
    value: getValue('array'),
    label: 'multicombo',
    key: 'multiselect'
  },
  {
    meta: { editType: 'select', options: getOptions('simple') },
    label: 'select',
    key: 'select'
  },
  {
    meta: { editType: 'checkbox' },
    label: 'checkbox',
    value: getValue('boolean'),
    key: 'checkbox'
  },
  {
    meta: {
      editType: 'flat_list',
      options: getOptions('simple')
    },
    label: 'flat_list',
    value: getValue('array'),
    key: 'flat_list'
  },
  {
    meta: {
      editType: 'fixed_flat_list',
      options: getOptions('simple')
    },
    label: 'fixed_flat_list',
    value: getValue('array'),
    key: 'fixed_flat_list'
  },
  {
    meta: { editType: 'map' },
    label: 'map',
    value: getValue('object'),
    key: 'map'
  },
  {
    meta: { editType: 'fixed_key_map', options: getOptions('simple') },
    label: 'fixed_key_map',
    value: getValue('object'),
    key: 'fixed_key_map'
  },
  {
    meta: { editType: 'readonly_key_map', options: getOptions('simple') },
    label: 'readonly_key_map',
    value: getValue('object'),
    key: 'readonly_key_map'
  },
  {
    meta: { editType: '2levels_map_list' },
    label: '2levels_map_list',
    value: getValue('nested-object'),
    key: '2levels_map_list'
  },
  {
    meta: { editType: 'fixed_key_map', options: getOptions('simple') },
    type: 'fixed_key_map',
    label: 'fixed_key_map',
    value: getValue('object'),
    fixedKeys: true,
    key: 'fixed_key_map'
  },
  { meta: { editType: 'image' }, edit: true, label: 'image', key: 'image' },
  {
    meta: { editType: 'JSON' },
    label: 'JSON',
    value: getValue('json'),
    key: 'json'
  }
]

const args = {
  variant: 'outlined',
  labelPlacement: 'start',
  inputWidth: 80,
  isGroupField: true
}

const TemplateEdit = (props) => <ScGeneralField {...props} {...args} edit={true} />

export const EditableListEdit = ({ items = fieldsArgsList }) => {
  return (
    <FieldsGroup>{items?.length && items.map(TemplateEdit.bind({}))}</FieldsGroup>
  )
}

const TemplateView = (props) => <ScGeneralField {...props} {...args} />

export const EditableListView = ({ items = fieldsArgsList }) => {
  return (
    <FieldsGroup>{items?.length && items.map(TemplateView.bind({}))}</FieldsGroup>
  )
}

EditableListEdit.storyName = 'Edit state'
EditableListView.storyName = 'View state'
