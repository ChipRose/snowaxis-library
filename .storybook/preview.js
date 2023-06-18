/** @type { import('@storybook/react').Preview } */
import './normalize.css'
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { GlobalStyle } from './GlobalStyle'
import { ThemeProvider } from 'styled-components'

import theme from '../src/theme/theme'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        standard: theme,
      },
      defaultTheme: 'standard',
      Provider: ThemeProvider,
      GlobalStyle
    })
  ]

}

export default preview
