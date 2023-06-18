import { getArgTypes } from '../../../../mocks'

const extraArgs = {
  headForm: {
    table: {
      category: 'Main'
    },
    type: 'object',
    description: 'Form field in header.'
  },
  actions: {
    table: {
      category: 'Main'
    },
    type: 'object',
    description: 'Controls nodes.'
  },
  maxWidth: {
    table: {
      category: 'Decorative'
    },
    control: 'select',
    description: 'Determine the max-width of the dialog.'
  },
}
export const argTypes = getArgTypes(extraArgs, 'modal')