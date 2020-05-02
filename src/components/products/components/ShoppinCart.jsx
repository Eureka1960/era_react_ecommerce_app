import React, { useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    Elements,
  } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const fetchAllProducts = () => {
    return axios.get('http://localhost:8000/api/products/all')
    .then(resp => resp.data)
    .catch(err => console.log(err));
}
 
function ShoppinCart(props){
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    const deCrementProductQuantity = async (id, quantity) => {
        id = parseInt(id);
        const resp = fetchAllProducts();
        await resp.then(data => {
           if (products.length === 0) {
               setProducts(data);
           }
            data.filter(product => (product.id === id) ? setProduct(product) : false);
        });
    }

    
    const inCrementProductQuantity = async (id, quantity) => {
        id = parseInt(id);
        const resp = fetchAllProducts();
        await resp.then(data => {
           if (products.length === 0) {
               setProducts(data);
           }
            data.filter(product => (product.id === id) ? setProduct(product) : false);
        });
        
    }

    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm 
                deCrementProductQuantity={deCrementProductQuantity} 
                inCrementProductQuantity={inCrementProductQuantity}
                product={product} 
            />
        </Elements>
    )
}

export default ShoppinCart;