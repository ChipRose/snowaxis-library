import React from 'react'
import { SnowTypography, SnowList, SnowListItem } from '../../../../adapter'
import { withRecoilFlow } from 'storybook-addon-recoil-flow/dist/decorator'

import { argTypes } from './argTypes'
import { getRandomItem } from '../../../../mocks'
import { ScVirtualTable } from '../ScVirtualTable'
import { ScGeneralField } from '../../../baseEditableFields'

const items = [...Array.from({ length: 100 }, getRandomItem)]

export default {
  title: 'TABLES/ScVirtualTable',
  component: ScVirtualTable,
  decorators: [withRecoilFlow],

  argTypes,
  args: {
    items,
    columns: [
      { field: 'country', headerName: 'Country', width: '25%' },
      { field: 'company', headerName: 'Company', width: '25%' },
      { field: 'product', headerName: 'Product', width: '25%' },
      {
        field: 'dateTo',
        headerName: 'Delivery date',
        headerFieldType: 'date',
        width: '25%'
      }
    ]
  }
}

const Template = (args) => <ScVirtualTable {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Editable = Template.bind({})
Editable.args = {
  tableTitle: 'Editable table',
  isEditable: true
}

export const Filtrable = Template.bind({})
Filtrable.args = {
  tableTitle: 'Editable and filtrable table',
  isEditable: true,
  isFiltrable: true
}

export const Collapsible = Template.bind({})
Collapsible.args = {
  tableTitle: 'Editable table with collapsible rows',
  isEditable: true,
  isFiltrable: true,
  isCollapsible: true,
  collapsibleRender: (props) => {
    const { material, description, extraInfo, id, editState, handleUpdate } =
      props
    const fields = [
      { field: 'material', value: material },
      { field: 'description', value: description },
      { field: 'extraInfo', value: extraInfo }
    ]
    return (
      <>
        <SnowTypography component="h1" fontWeight={500}>
          {id}
        </SnowTypography>
        <SnowList>
          {fields.map(({ field, value: _value }, index) => (
            <SnowListItem key={index}>
              <ScGeneralField
                edit={editState}
                value={_value}
                label={field}
                code={field}
                onUpdate={handleUpdate}
              />
            </SnowListItem>
          ))}
        </SnowList>
      </>
    )
  }
}
