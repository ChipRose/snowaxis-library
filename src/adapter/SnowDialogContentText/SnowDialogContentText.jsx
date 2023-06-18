import React from 'react'
import DialogContentText from '@mui/material/DialogContentText'

const SnowDialogContentText = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <DialogContentText ref={ref} {...props}>
        {children}
      </DialogContentText>
    )
  }
)

export default SnowDialogContentText
