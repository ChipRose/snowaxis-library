import { getArgTypes } from '../../../../mocks'

const extraArgs = {
  value: {
    table: {
      category: 'Main'
    },
    description: 'Field value.'
  },
  code: {
    table: {
      category: 'Main'
    },
    description: 'Field code.'
  },
}

export const argTypes = getArgTypes(extraArgs, 'simple')