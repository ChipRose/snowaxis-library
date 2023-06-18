import React from 'react'
import { SnowTypography, SnowList, SnowListItem } from '../../../../adapter'
import { withRecoilFlow } from 'storybook-addon-recoil-flow/dist/decorator'

import { argTypes } from './argTypes'
import { getRandomItem } from '../../../../mocks'
import { ScSimpleTable } from '../ScSimpleTable'
import { ScGeneralField } from '../../../baseEditableFields'

const items = [...Array.from({ length: 100 }, getRandomItem)]

export default {
  title: 'TABLES/ScSimpleTable',
  component: ScSimpleTable,
  argTypes,
  args: {
    items,
    columns: [{ field: 'country', width:'25%' }, { field: 'company', width:'25%' }, { field: 'product', width:'25%' }, { field: 'dateTo', width:'25%' }],
    selectable: true,
  }
}

const Template = (args) => <ScSimpleTable {...args} />

export const Default = Template.bind({})
Default.args = {}

// export const Editable = Template.bind({})
// Editable.args = {
//   tableTitle: 'Editable table',
//   isEditable: true
// }

// export const Filtrable = Template.bind({})
// Filtrable.args = {
//   tableTitle: 'Editable and filtrable table',
//   isEditable: true,
//   isFiltrable: true
// }

// export const Collapsible = Template.bind({})
// Collapsible.args = {
//   tableTitle: 'Editable table with collapsible rows',
//   isEditable: true,
//   isFiltrable: true,
//   isCollapsible: true,
//   collapsibleRender: (props) => {
//     const { material, description, extraInfo, id, editState, handleUpdate } =
//       props
//     const fields = [
//       { field: 'material', value: material },
//       { field: 'description', value: description },
//       { field: 'extraInfo', value: extraInfo }
//     ]
//     return (
//       <>
//         <SnowTypography component="h1" fontWeight={500}>
//           {id}
//         </SnowTypography>
//         <SnowList>
//           {fields.map(({ field, value: _value }, index) => (
//             <SnowListItem key={index}>
//               <ScGeneralField
//                 edit={editState}
//                 value={_value}
//                 label={field}
//                 code={field}
//                 onUpdate={handleUpdate}
//               />
//             </SnowListItem>
//           ))}
//         </SnowList>
//       </>
//     )
//   }
// }
