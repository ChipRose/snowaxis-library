import React from 'react'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'

const TypographyView = styled(Typography)`
  &.MuiTypography-root {
    ${({ textcolor, fontWeight, fontSize, theme, texttransform }) => `
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
      color: ${textcolor ? textcolor : theme.mainPalette.typography.main};
      text-transform: ${texttransform ? texttransform : 'none'};
    `}
  }
`

const SnowTypography = React.forwardRef(({ children, ...props }, ref) => {
  const fontProps = {
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    color: props.color,
    textTransform: props.textTransform
  }
  return (
    <TypographyView ref={ref} {...fontProps} {...props}>
      {children}
    </TypographyView>
  )
})

export default SnowTypography
