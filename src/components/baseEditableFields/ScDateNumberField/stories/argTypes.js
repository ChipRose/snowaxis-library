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
}

export const argTypes = getArgTypes(extraArgs)