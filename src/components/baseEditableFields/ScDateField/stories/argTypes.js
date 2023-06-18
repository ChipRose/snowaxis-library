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
  dateFormat: {
    table: {
      category: 'Main'
    },
    description: 'Date format.'
  },
  popperPlacement: {
    table: {
      category: 'Decorative'
    },
    control: { type: 'select' },
    options: ['top', 'start', 'end'],
    description: 'Popper placement.',
  },
  placeholder: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    description: 'Field placeholder.'
  },
  isClearable: {
    table: {
      category: 'Boolean'
    },
    description: 'Add a button for clearing the field.',
  },
}

export const argTypes = getArgTypes(extraArgs)