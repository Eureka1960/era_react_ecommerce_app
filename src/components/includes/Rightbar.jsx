import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import WishItem from './WishItem';
import { Link } from 'react-router-dom';

export default function Rightbar(props) {
    let itemIndex = 1;
    let totalAmount = parseFloat(0);

    if (typeof props.cartItems !== 'undefined' && props.cartItems.length > 0) {
        for (let index = 0; index < props.cartItems.length; index++) {
            const el = props.cartItems[index];
            totalAmount += parseFloat(el.product_price) * parseInt(el.quantity);            
        }
    }
    return (
        <div className="col-2">
            <h4>Panier(Articles)</h4>
            <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Qté</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize:'11px' }}>
                    {
                        typeof props.cartItems !== "undefined" && props.cartItems.length > 0 ?
                            props.cartItems.map(item => (
                                <WishItem itemIndex={itemIndex++} item={item} removeItemFromCart={props.removeItemFromCart} key={item.product_id} />
                            ))
                            
                        : <tr className="text-danger center">
                            <td colSpan="4">Le panier est vide</td>
                        </tr>
                    }

                    {
                        typeof props.cartItems !== "undefined" && props.cartItems.length > 0?
                        <tr>
                            <td colSpan="2" style={{ fontSize:'14px', fontWeight:'bold' }}>Total</td>
                            <td className="text-success" style={{ fontSize:'15px', fontWeight:'bolder' }}>${totalAmount.toFixed(2)}</td>
                        </tr>
                        : ''
                    }
                </tbody>
                </table>
                {
                    typeof props.cartItems !== "undefined" && props.cartItems.length > 0?
                        <Link to="/cart" className="btn bt-xs btn-danger float-right" >
                            Panier
                        </Link>
                    : ''
                }
            </div>
        </div>
    )
}
