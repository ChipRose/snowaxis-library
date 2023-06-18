import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'

const SnowAutocomplete = React.forwardRef(({ children, ...props }, ref) => {
  return <Autocomplete ref={ref} {...props} />
})

export default SnowAutocomplete
