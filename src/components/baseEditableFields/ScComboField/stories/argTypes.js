import { getArgTypes} from '../../../../mocks'

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
  clearIcon: {
    table: {
      category: 'Decorative'
    },
    type: 'node',
    description: 'Icon for clear button.'
  },
  placeholder: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    description: 'Field placeholder.'
  },
  freeSolo: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'freeSolo property of Autocomplete in material UI.'
  },
  disableIndicatorNewValue: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'Indicate if new value set.'
  },
  tooltipNewValue: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'Show tooltip if new value set.'
  },
  disableClearable: {
    table: {
      category: 'Boolean'
    },
    description: 'Add a button for clearing the field.',
  },
}

export const argTypes = getArgTypes(extraArgs)