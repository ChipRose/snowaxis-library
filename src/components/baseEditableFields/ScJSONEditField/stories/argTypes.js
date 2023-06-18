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
  tooltipText: {
    table: {
      category: 'Decorative'
    },
    description: 'Tooltip text.',
  },
  helperText: {
    table: {
      category: 'Decorative'
    },
    description: 'Text for extra information.'
  },
  variant: {
    table: {
      category: 'Decorative'
    },
    description: 'Input style.',
    control: { type: 'select' },
    options: ['standard', 'outlined'],
  },
}

export const argTypes = getArgTypes(extraArgs, 'simple')