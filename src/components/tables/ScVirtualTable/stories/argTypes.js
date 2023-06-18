import { getArgTypes } from '../../../../mocks'

const extraArgs = {
  items: {
    table: {
      category: 'Main'
    },
    type: 'array',
    description: 'Table content.'
  },
  columns: {
    table: {
      category: 'Main'
    },
    type: 'array',
    description: 'Determine table column view.'
  },
  newItemId: {
    table: {
      category: 'Main'
    },
    type: 'string',
    description: 'Id for new item.'
  },
  isEditable: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'Set table editable state.'
  },
  isCollapsible: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'Set table collapsible state.'
  },
  isFiltrable: {
    table: {
      category: 'Boolean'
    },
    type: 'boolean',
    description: 'Set filtrable state for editable table.'
  },
  tableTitle: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    description: 'Table title.'
  },
  tableHeight: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    description: 'Table height.'
  },
  collapsibleRender: {
    table: {
      category: 'Decorative'
    },
    description: 'Layout for collapsible row.'
  },
  onUpdateItem: {
    table: {
      category: 'Event'
    },
    type: 'func',
    action: true
  },
  onDeleteItem: {
    table: {
      category: 'Event'
    },
    type: 'func',
    action: true
  },
  onCreateItem: {
    table: {
      category: 'Event'
    },
    type: 'func',
    action: true
  },
}
export const argTypes = getArgTypes(extraArgs, 'table')