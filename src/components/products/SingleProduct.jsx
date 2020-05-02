import React from 'react'

const SingleProduct = props => {
    return (
        <div>
            <h3>{props.product.name} </h3>
            {/* <img src={`../images/${props.product.image}`} alt={props.product.name} /> */}
            {/* <img src={ require(`../images/${props.product.image}`) } className="img-thumbnail" alt="Purse"/> */}
        </div>
    )
}

export default SingleProduct;
