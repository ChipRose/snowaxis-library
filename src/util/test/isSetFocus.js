import { expect } from '@storybook/jest'
import { userEvent, within } from '@storybook/testing-library'

const isSetFocus = (props) => {
  const { canvasElement, args } = props
  const canvas = within(canvasElement)
  const { label } = args

  const labelElement = canvas.getByText(label)
  const fieldElement = canvas.getByLabelText(label, {
    selector: 'input',
  })
  userEvent.click(labelElement)
  expect(fieldElement).toHaveFocus()
  userEvent.click(canvasElement)
  expect(fieldElement).not.toHaveFocus()

}

export {
  isSetFocus
}