import React from 'react'
import TableCell from '@mui/material/TableCell'

const SnowTableCell = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <TableCell ref={ref} {...props}>
      {children}
    </TableCell>
  )
})

export default SnowTableCell
