import { getArgTypes } from '../../../../mocks'

const extraArgs = {
  value: {
    table: {
      category: 'Main'
    },
    description: 'Field value.'
  },
  updateDelay: {
    table: {
      category: 'Main'
    },
    description: 'Update value delay.',
  },
  code: {
    table: {
      category: 'Main'
    },
    description: 'Field code.'
  },
  type: {
    table: {
      category: 'Main'
    },
    control: { type: 'select' },
    options: ['password', 'text'],
  },
  focused: {
    table: {
      category: 'Boolean'
    },
    description: 'Is field focused.'
  },
  tooltipText: {
    table: {
      category: 'Decorative'
    },
    description: 'Tooltip text.',
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