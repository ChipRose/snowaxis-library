const boolArgs = {
  isInvalid: {
    table: {
      category: 'Boolean'
    },
    control: { type: 'boolean' },
    description: 'Indicate if value invalid.',
  },
  required: {
    table: {
      category: 'Boolean'
    },
    control: { type: 'boolean' },
    description: 'Indicate if field required.',
  },
  disabled: {
    table: {
      category: 'Boolean'
    },
    control: { type: 'boolean' },
    description: 'Set field disabled.',
  },
  isGroupField: {
    table: {
      category: 'Boolean'
    },
    control: { type: 'boolean' },
    description: 'Set group props for field.',
  }
}

const decorativeArgs = {
  label: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    control: { type: 'text' },
    description: 'Field label.'
  },
  labelPlacement: {
    table: {
      category: 'Decorative'
    },
    description: 'Where label is placed. Label should exist.',
    control: { type: 'select' },
    options: ['top', 'start', 'end', 'top-big', ''],
  },
  helperText: {
    table: {
      category: 'Decorative'
    },
    control: { type: 'string' },
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
  inputWidth: {
    table: {
      category: 'Decorative'
    },
    control: { type: 'text' },
    description: 'Field width in % or auto.',
  },
  mb: {
    table: {
      category: 'Decorative'
    },
    control: { type: 'text' },
    description: 'Margin bottom in px.',
  },
  fieldFontProps: {
    table: {
      category: 'Decorative'
    },
    type: 'object',
    description: 'Set font props for editable field.'
  },
  labelFontProps: {
    table: {
      category: 'Decorative'
    },
    type: 'object',
    description: 'Set font props for editable field label.'
  },
}

const decorativeArgsGroupField = {
  label: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    description: 'Group field label.'
  },
  labelPlacement: {
    table: {
      category: 'Decorative'
    },
    description: 'Where label is placed. Label should exist.',
    control: { type: 'select' },
    options: ['top', 'start', 'end'],
  },
  variant: {
    table: {
      category: 'Decorative'
    },
    description: 'Input style.',
    control: { type: 'select' },
    options: ['standard', 'outlined'],
  },
  inputWidth: {
    table: {
      category: 'Decorative'
    },
    description: 'Fields width in % or auto.',
  },
  fieldFontProps: {
    table: {
      category: 'Decorative'
    },
    type: 'object',
    description: 'Set font props for editable field.'
  },
  labelFontProps: {
    table: {
      category: 'Decorative'
    },
    type: 'object',
    description: 'Set font props for editable field label.'
  },
}

const decorativeArgsSimpleField = {
  label: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    description: 'Field label.'
  },
  labelPlacement: {
    table: {
      category: 'Decorative'
    },
    description: 'Where label is placed. Label should exist.',
    control: { type: 'select' },
    options: ['top', 'start', 'end', 'top-big', ''],
  },
  inputWidth: {
    table: {
      category: 'Decorative'
    },
    description: 'Field width in % or auto.',
  },
  mb: {
    table: {
      category: 'Decorative'
    },
    description: 'Margin bottom in px.',
  },
  labelFontProps: {
    table: {
      category: 'Decorative'
    },
    type: 'object',
    description: 'Set font props for editable field label.'
  },
}

const funcArgs = {
  onUpdate: {
    table: {
      category: 'Event'
    },
    type: 'func',
    action: true
  }
}

const buttonArgs = {
  label: {
    table: {
      category: 'Decorative'
    },
    type: 'string',
    description: 'Button label.'
  },
  size: {
    table: {
      category: 'Decorative'
    },
    control: { type: 'select' },
    options: ['large', 'small', 'medium'],
    description: 'Button size.'
  },
  disabled: {
    table: {
      category: 'Boolean'
    },
    description: 'Set button disabled.',
  },
  onClick: {
    table: {
      category: 'Event'
    },
    type: 'func',
    action: true
  }
}

const modalArgs = {
  message: {
    table: {
      category: 'Main'
    },
    description: 'Title and content for modal window.',
  },
  confirmProps: {
    table: {
      category: 'Main'
    },
    description: 'Props for confirm button.',
  },
  labelForConfirmBtn: {
    table: {
      category: 'Decorative'
    },
    description: 'Label for confirmation button.',
  },
  labelForCancelBtn: {
    table: {
      category: 'Decorative'
    },
    description: 'Label for cancel button.',
  },
  open: {
    table: {
      category: 'Boolean'
    },
    description: 'If true, the component is shown.',
  },
  onConfirm: {
    table: {
      category: 'Event'
    },
    type: 'func',
    action: true
  },
  onClose: {
    table: {
      category: 'Event'
    },
    type: 'func',
  }
}

const tableArgs = {

}

export const getArgTypes = (extraArgTypes = {}, type = 'basic') => {
  switch (type) {
    case ('simple'):
      return (
        {
          ...boolArgs,
          ...decorativeArgsSimpleField,
          ...funcArgs,
          ...extraArgTypes
        }
      )
    case ('group'):
      return (
        {
          ...boolArgs,
          ...decorativeArgsGroupField,
          ...funcArgs,
          ...extraArgTypes
        }
      )
    case ('button'):
      return (
        {
          ...buttonArgs
        }
      )
    case ('modal'):
      return ({
        ...modalArgs,
        ...extraArgTypes
      })
    case ('table'):
      return ({
        ...tableArgs,
        ...extraArgTypes
      })
    default:
      return (
        {
          ...boolArgs,
          ...decorativeArgs,
          ...funcArgs,
          ...extraArgTypes
        }
      )
  }
}