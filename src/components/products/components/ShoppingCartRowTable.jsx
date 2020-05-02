import React, { useState } from 'react'

export default function ShoppingCartRowTable(props) {
    let {product_id, product_name, product_price, quantity} = props.item;
    let [productQuantity, setProductQuantity] = useState(parseInt(quantity));
    let countItem = props.countItem;
    let product = props.product;
    const decreaseQuantity = () => productQuantity >= 1 ? setProductQuantity(productQuantity - 1) : null;
  return (
    <tr>
        <td>{countItem}</td>
        <td>{product_name}</td>
        <td>${product_price}</td>
        <td>
            <button className="btn btn-xs btn-default" onClick={decreaseQuantity} >-</button>
            {productQuantity}
            <button className="btn btn-xs btn-default" onClick={props.inCrementProductQuantity.bind(this, product_id, quantity)}  >+</button>
        </td>
        <td></td>
        <td>${parseFloat(product_price * quantity).toFixed(2)}</td>
    </tr>
  )
}
