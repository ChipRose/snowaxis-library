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
    description: 'Field code.'
  },
  meta: {
    table: {
      category: 'Main'
    },
    type: 'object',
    description: 'Income options. It can be different types.'
  },
  fixedKeys: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'Key fields can\'t be changed'
  },
  readonlyKeys: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'Set key fields readonly'
  },
  required: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'Indicate if field required',
  },
  focusedOn: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
  },
  onError: {
    table: {
      category: 'Event'
    },
    type: 'func',
  },
}
export const argTypes = getArgTypes(extraArgs, 'group')