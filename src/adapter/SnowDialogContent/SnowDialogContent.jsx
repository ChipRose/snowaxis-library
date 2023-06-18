import React from 'react'
import DialogContent from '@mui/material/DialogContent'

const SnowDialogContent = React.forwardRef(({ children, ...props }, ref) => {
  return <DialogContent ref={ref} {...props}>{children}</DialogContent>
})

export default SnowDialogContent
