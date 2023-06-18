import React from 'react'
import TableContainer from '@mui/material/TableContainer'

const SnowTableContainer = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <TableContainer {...props} ref={ref}>
      {children}
    </TableContainer>
  )
})

export default SnowTableContainer
