import { getArgTypes } from '../../../../mocks'

const extraArgs = {
  icon: {
    table: {
      category: 'Decorative'
    },
    description: 'Dialog header icon.'
  },
  isIconExist: {
    table: {
      category: 'Boolean'
    },
    description: 'Indicate if icon exist.'
  },
  isHtmlInContent: {
    table: {
      category: 'Boolean'
    },
    description: 'Indicate if HTML layout in content exist.'
  },
  loading: {
    table: {
      category: 'Boolean'
    },
    description: 'Indicate loading process.'
  },

}
export const argTypes = getArgTypes(extraArgs, 'modal')