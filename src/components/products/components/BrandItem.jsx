import React from 'react'

export default function BrandItem(props) {
  return (
      <div>
          <input type="radio" name="brand" value={props.brand.id} onClick={props.fetchProductByBrand.bind(this, props.brand.id)} /> {props.brand.name} <br/>
      </div>
  )
}
