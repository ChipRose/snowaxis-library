import React, {useContext} from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import themes from 'react-json-editor-ajrm/themes'
import { ThemeContext } from 'styled-components'

const SnowJSONInput = (props) => {
  const theme = useContext(ThemeContext)
  const { ...rest } = props
  const lightPalette = themes.light_mitsuketa_tribute
  const darkPalette = {
    ...themes.dark_mitsuketa_tribute,
    background: theme.mainPalette.color.main
  }
  const palette = props.viewOnly ? lightPalette : darkPalette

  return (
    <JSONInput
      locale={locale}
      colors={palette}
      {...rest}
    />
  )
}

export default SnowJSONInput
