import React from 'react'
import TableRow from '@mui/material/TableRow'

const SnowTableRow = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <TableRow ref={ref} {...props}>
      {children}
    </TableRow>
  )
})

export default SnowTableRow
