import React, { Component } from 'react'
import Leftbar from './includes/Leftbar'
import Rightbar from './includes/Rightbar'
import Product from './products/Product'

export class Home extends Component {
    render() {
        return (
           <div>
               <div className="col-12">
                   <div className="row">
                        <Leftbar 
                            all_brands={this.props.all_brands} 
                            fetchProductByBrand={this.props.fetchProductByBrand} 
                            fetchProductPlageOfPrice={this.props.fetchProductPlageOfPrice}
                        />
                        <div className="col-8">
                            <h2 className="text-center">Produit à vendre</h2> <hr/>
                            <div className="row">
                                {
                                    typeof this.props.products !== "undefined" && this.props.products.length > 0 ?
                                        this.props.products.map(product => (
                                            <Product 
                                                product={product} 
                                                onClick={this.props.onClick}
                                                addToCart={this.props.addToCart}
                                                showProduct={this.props.showProduct}
                                                key={product.id}
                                            />
                                        ))
                                    : <h5 className="text-danger center">Pas de produit pour cette recherche...!!!</h5>
                                }                                
                            </div>
                        </div>
                        <Rightbar cartItems={this.props.cartItems} removeItemFromCart={this.props.removeItemFromCart} />
                   </div>
               </div>    
           </div>
        )
    }
}

export default Home
