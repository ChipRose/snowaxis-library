import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    height: 100%;
    width: 100%;

    font-family: "Roboto", "Arial", sans-serif;
    box-sizing: border-box;
    ${({ theme }) => `
      font-size: ${theme.fontSize.main};
      line-height: ${theme.lineHeight.main};
      color: ${theme.mainPalette.typography.main};
      background:  ${theme.mainPalette.color.contrast};
    `}
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  address {
    font-style: normal;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.mainPalette.color.secondary};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6, p, span {
    ${({ theme }) => `
    font-weight: ${theme.fontWeight.main};
    color: ${theme.mainPalette.typography.main};
    `}

  ul,
  p, 
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0;
  }
`

export { GlobalStyle }
