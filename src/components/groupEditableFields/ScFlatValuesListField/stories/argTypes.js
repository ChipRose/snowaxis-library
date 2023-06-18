import { getArgTypes } from '../../../../mocks';

const extraArgs = {
  value: {
    table: {
      category: 'Main'
    },
    description: 'Fields value.'
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
    description: 'Fields code.'
  },
  meta: {
    table: {
      category: 'Main'
    },
    type: 'object',
    description: 'Income options. It can be different types.'
  },
}
export const argTypes = getArgTypes(extraArgs, 'group')