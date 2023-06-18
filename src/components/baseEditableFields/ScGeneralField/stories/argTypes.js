import { getArgTypes } from '../../../../mocks'

const extraArgs = {
  value: {
    table: {
      category: 'Main'
    },
    type: 'string',
    description: 'Field value.'
  },
  code: {
    table: {
      category: 'Main'
    },
    type: 'string',
    description: 'Field code.'
  },
  meta: {
    table: {
      category: 'Main'
    },
    type: 'object',
    description: 'Income options. It can be different types.'
  },
  updateDelay: {
    table: {
      category: 'Main'
    },
    type: 'number',
    description: 'Update value delay.',
  },
  tooltipText: {
    table: {
      category: 'Decorative'
    },
    control: {type: 'text'},
    description: 'Tooltip text.',
  },
  helperText: {
    table: {
      category: 'Decorative'
    },
    control: {type: 'text'},
    description: 'Helper text.',
  },
  edit:{
    table: {
      category: 'Boolean'
    },
    control: 'boolean'
  }
}

export const argTypes = getArgTypes(extraArgs)