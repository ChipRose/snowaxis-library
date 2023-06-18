import React from 'react'
import WarningIcon from '@mui/icons-material/Warning'
import styled from 'styled-components'

const WarningIconView = styled(WarningIcon)`
  z-index: 2;
  path {
    color: ${({ theme }) => theme.mainPalette.warning.secondary};
  }
`

const SnowWarningIcon = ({ fontSize = 'large' }) => {
  return <WarningIconView fontSize={fontSize} />
}

export default SnowWarningIcon
