import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'

const isSettingNewValue = async (props) => {
  const { canvasElement, newValue, args } = props
  const canvas = within(canvasElement)

  userEvent.clear(canvas.getByRole(args.role))
  userEvent.type(canvas.getByRole(args.role), newValue)
  await waitFor(() => expect(args.onUpdate).toHaveBeenCalledTimes(1))
  await waitFor(() =>
    expect(args.onUpdate).toBeCalledWith({
      value: newValue,
      key: args.code
    })
  )
}

export {
  isSettingNewValue
}