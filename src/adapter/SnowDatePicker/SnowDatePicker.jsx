import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'


const SnowDatePicker = React.forwardRef((props, ref) => {
  return <DatePicker ref={ref} {...props} />
})

export default SnowDatePicker
