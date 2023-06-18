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
    type: 'string',
    description: 'Tooltip text.'
  },
  placeholder: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    description: 'Field placeholder.'
  },
}

export const argTypes = getArgTypes(extraArgs)