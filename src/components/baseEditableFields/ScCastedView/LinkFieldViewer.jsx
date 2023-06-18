import React from 'react'

const fakeData = {
  type: 'link',
  label: 'Marketplace Product Id',
  link_type: 'external',
  label_reference:
    'https://snow-axis-staging.myshopify.com/admin/products/6938035683510/variants/40335282569398',
  url_params: {
    target: '_blank'
  },
  code: 'marketplace_product_id',
  editType: 'link'
}
const LinkFieldViewer = ({
  label,
  link_type,
  label_reference,
  url_params,
  code,
  type,
  editType
} = fakeData) => {
  switch (link_type) {
    case 'external': {
      return (
        <a
          href={`${label_reference}`}
          {...url_params}
          aria-labelledby={code}
          title={'Go to Store Admin'}
        >
          {label}
        </a>
      )
    }
  }
  return <div>{label}</div>
}

export default LinkFieldViewer
