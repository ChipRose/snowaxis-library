import React, { Fragment, useEffect, useState } from 'react'
import {
  SnowButtonGroup,
  SnowClickAwayListener,
  SnowGrid,
  SnowMenuItem,
  SnowBox,
  SnowMenu,
} from '../../../adapter'
import { ScTextField, ScDateField, ScDropdownField } from '../../baseEditableFields'
import { ScSecondaryBtn } from '../../buttons'
import { SnowArrowDropDownIcon } from '../../../adapter'
import { isDate } from 'date-fns'

export const ScDateNumberField = ({
  value,
  onUpdate,
  label,
  code,
  ...props
}) => {
  const [val, setVal] = useState({
    specify: isDate(value) ? new Date(value) : '',
    shift: Number(value)
  })

  const options = [
    {
      label: 'Specify dates',
      type: 'specify',
      component: (props) => <ScDateField {...props} />
    },
    {
      label: 'Shift dates',
      type: 'shift',
      component: (props) => <ScTextField {...props} size="small" />
    }
  ]
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const handelUpdate = ({ key, value, type }) => {
    console.log('ScDateNumberField handelUpdate', key, code, value, type)
    setVal((val) => ({ ...val, [type]: value }))
    onUpdate({ key: code, value })
  }
  const handleClick = () => {
    console.info(
      `You clicked ${options[selectedIndex].label}`,
      options[selectedIndex]
    )
  }
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  useEffect(() => {
    console.log({ open })
  }, [open])

  useEffect(() => {
    if (!value || value === val[options[selectedIndex].type]) return
    onUpdate({ key: code, value: val[options[selectedIndex].type] })
  }, [selectedIndex])

  return (
    <SnowGrid
      container
      direction="row"
      alignItems="center"
      justifyContent={'flex-start'}
      spacing={2}
    >
      <SnowGrid item>
        <SnowButtonGroup
          variant="contained"
          color="primary"
          ref={anchorRef}
          aria-label="split button"
        >
          <ScSecondaryBtn
            onClick={handleClick}
            label={options[selectedIndex].label}
          />
          <Fragment>
            <ScSecondaryBtn
              color="primary"
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
              label={<SnowArrowDropDownIcon color={'white'} />}
            />
            <SnowMenu
              anchorEl={anchorRef.current}
              open={open}
              onClose={handleToggle}
              anchorReference ={'anchorEl'}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <SnowClickAwayListener onClickAway={handleClose}>
                <SnowBox>
                  {options.map((option, index) => (
                    <SnowMenuItem
                      key={option.label}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.label}
                    </SnowMenuItem>
                  ))}
                </SnowBox>
              </SnowClickAwayListener>
            </SnowMenu>
          </Fragment>
        </SnowButtonGroup>
      </SnowGrid>
      <SnowGrid item>
        {options[selectedIndex].component({
          ...{
            value: val[options[selectedIndex].type],
            onUpdate: (val) =>
              handelUpdate({ ...val, type: options[selectedIndex].type }),
            label,
            code,
            ...props
          }
        })}
      </SnowGrid>
    </SnowGrid>
  )
}

export default ScDateNumberField
