import React, { useState } from 'react'


function ProductModal(props) {
    let [quantitySeleted, setQuantitySeleted] = useState(0);
    // let [cart, setCart] = useState({});
    let {id, name, image, price, quantity, details} = props.product;
    let [prodQuantity, setProdQuantity] = useState(quantity);

    
    
    const minusProdQuantities = num => setProdQuantity(quantity - num);
    
    const onQuantityChange = e => {
        setQuantitySeleted(parseInt(e.target.value));
        minusProdQuantities(quantitySeleted);
    }

    const form = document.getElementById(`productModalForm${id}`);

    const onSubmit = e => {
        e.preventDefault();
        if (quantitySeleted > 0) document.getElementById(`closeModal${id}`).click();
    }
    
    return (
        <div>
        {
            props.product ?
            <div className="modal fade lg" id={`productModal${props.product.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"> <b className="text-center">Article - {props.product.name} </b> </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={onSubmit} id={`productModalForm${id}`}>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-8">
                                <p>Marque : <b className="text-success">{props.product_brand}</b> </p>
                                <img src={require('../images/' + image)} className="img-thumbnail" style={imageProductModal} alt={name} />
                                <div style={productStyle.productPriceDiv} className="bg-success">
                                    <span style={productStyle.productPriceSpan}>${price}</span>
                                </div>
                                <h5 className="text-primary float-left">Quantité: <b className="text-danger">{prodQuantity}</b></h5>
                            </div>
                            <div className="col-4 justify">
                                <h4 className="text-info">Détails</h4>
                                <p>{details}</p>                                
                                    <input type="hidden" name="product_id" value={id} />
                                    <input type="hidden" name="product_name" value={name} />
                                    <input type="hidden" name="product_price" value={price} />
                                    {/* <input type="hidden" name="product_quantity" value={quantitySeleted} /> */}
                                    <div className="form-group">
                                        <div className="col-xs-3 float-left"><label htmlFor="quantity">Quantité</label></div>
                                        <input type="number" name="quantity" min="0" max={quantity} value={quantitySeleted} onChange={onQuantityChange} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="float-left" htmlFor="size">Size</label>
                                        <select name="size" className="form-control">
                                            <option value=""></option>
                                            <option value="28">28</option>
                                            <option value="32">32</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" id={`closeModal${id}`}>Fermer</button>
                        <input type="submit" className="btn btn-primary" onClick={props.addToCart.bind(this, form)} value="Ajouter Au Panier" />
                    </div>
                    </form>
                    </div>
                </div>
            </div>
            : <h1>Something wrong</h1>
        }
    </div>
  )
}

const imageProductModal = {
    height:'350px',
    width:'350px'
}

const productStyle = {
    productPriceSpan:{
        color:'white',
        fontSize:'24px',
        fontWidth:'bolder'
    },

    productPriceDiv:{
        zIndex:'100',
        position:'relative',
        overFlow:'hidden',
        border:'2px #ccc solid',
        borderRadius:'50%',
        width:'130px',
        height:'130px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItem:'center',
        float:'right',
        marginRight:'30px',
        marginTop:'-120px'
    }
}

export default ProductModal;
