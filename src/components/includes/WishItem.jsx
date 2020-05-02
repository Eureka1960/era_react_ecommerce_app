import React from 'react'

export default function WishItem(props) {
    let index = props.itemIndex;
    const {product_id, product_name, product_price, quantity} = props.item;
  return (
    <tr>
        <th scope="row">{index}</th>
        {/* {props.itemIndex++} */}
        <td>
            <b onDoubleClick={props.removeItemFromCart.bind(this, product_id)} style={{ cursor:'pointer' }}>
                {product_name}
            </b>
        </td>
        <td>${product_price}</td>
        <td>{quantity}</td>
    </tr>
  )
}
