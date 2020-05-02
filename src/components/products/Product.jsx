import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProductModal from '../includes/ProductModal';
import Axios from 'axios';

export class Product extends Component {
    state = {
        brand:''
    }
    componentDidMount(){
        Axios.get(`http://localhost:8000/api/brand/show/${this.props.product.brand_id}`)
            .then(resp => this.setState({brand:resp.data.name}));
    }
    render() {
        const {id, name, list_price, price, image} = this.props.product;
        return (
                <div className="col-sm-3 text-center">
                    <h4>{`${name.substr(0, 10)} ${name.length > 9? "..." : ""}`}</h4>
                    <Link to='/show_product' onClick={this.props.showProduct.bind(this, id)} >
                        <img src={ require(`../images/${image}`) } className="img-thumbnail" style={imgStyle} onClick={this.props.onClick.bind(this, id)} alt={name} title={name} />
                    </Link>
                    <p className="list price text-danger">Liste Prix: <s>${list_price}</s></p>
                    <p className="price">Notre Prix : ${price}</p>
                    <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target={`#productModal${id}`} >Details</button>
                    <ProductModal                         
                        product={this.props.product} 
                        product_brand={this.state.brand}
                        addToCart={this.props.addToCart}
                    />
                </div>
        )
    }
}

const imgStyle = {
    width:"210px",
    height:"170px"
}

export default Product
