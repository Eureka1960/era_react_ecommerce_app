import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/includes/Header';
import Home from './components/Home';
import Blog from './components/Blog';
import Contact from './components/Contact'
import About from './components/About'
import ProductDetails from './components/products/ProductDetails';
import Categories from './components/admin/Categories';
import ShoppinCart from './components/products/components/ShoppinCart';
import Footer from './components/includes/Footer';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      products:[],
      all_products:[],
      oldProducts:[],
      productId:0,
      product:{},
      brands:[],
      cartItems: localStorage.getItem('cart_items') === null ? [] : JSON.parse(localStorage.getItem('cart_items'))
    }
  }
  

  componentDidMount(){
    axios.get("http://127.0.0.1:8000/api/products")
        .then(resp => {
          // this.setState({products:resp.data})
          this.setState({oldProducts:resp.data});
        })
        .catch(err => console.log(err));

    axios.get("http://localhost:8000/api/brands")
      .then(resp => this.setState({brands:resp.data}))
      .catch(err => console.log(err));
    
    axios.get('http://localhost:8000/api/products/all')
    .then(resp => this.setState({all_products:resp.data}))
    .catch(err => console.log(err));

  }

  fetchProductByBrand = brand_id => {
    const filter_prod = this.state.oldProducts.filter(product => product.brand_id === brand_id);
    if (brand_id !== 0) {
      if (filter_prod.length === 0){
        alert("Pas d'article pour la marque séléctionnée !!!");
        return;
      }
      this.setState({products:[...this.state.oldProducts.filter(product => product.brand_id === brand_id)]});
    } else this.setState({products:[]})
    // this.setState({products:[...this.state.products.filter(product => product.brand_id === brand_id)]});
    // axios.get(`http://localhost:8000/api/products/fetch_brand_id/${brand_id}`)
    //   .then(resp => this.setState({products:resp.data}));
  }

  fetchProductPlageOfPrice = (lPrice, hPrice) => {
    if (!isNaN(lPrice)) {
      if (lPrice <= hPrice) {
        this.setState({products:[...this.state.oldProducts.filter(prod => (parseFloat(prod.price) >= lPrice && parseFloat(prod.price) <= hPrice))]})
      }
    }
    // this.forceUpdate();
  }

  onClick(id) {
    this.setState({productId:id})
  }

  showProduct = id => {
    const fProduct = this.state.products.filter(product => product.id === id);
    this.setState({product:fProduct[0]})
  }

  cartItemSetState = data => {
    if (this.state.cartItems.length === 0) this.setState({cartItems:[...this.state.cartItems, data]});
    else {
      let oldItems = this.state.cartItems;
      const fItem = oldItems.filter(item => {
        if (parseInt(item.product_id) === parseInt(data.product_id)) {
          item.quantity = parseInt(item.quantity) + parseInt(data.quantity);
          return true;
        }
      });
      
      // let newItems = [];
      if (fItem.length > 0) oldItems.concat(fItem);
      else oldItems.push(data);
      this.setState({cartItems: oldItems});
    }
  }

  addToCart = modal_form => {
    let data = {};
    for(let field of modal_form) {
        if (field.type !== "submit") {
            data[field.name] = field.value;
        }
    }

    if (parseInt(data.quantity) !== 0) {
      this.cartItemSetState(data)
    } else {
      alert("Le champs quantity ne doit pas être vide !!!");
      return;
    }

  }

  testClick = () => alert("Je suis content");

  removeItemFromCart = id => this.setState({cartItems:[...this.state.cartItems.filter(item => parseInt(item.product_id) !== parseInt(id))]});

  
  render() {
    const products = this.state.products;
    const oldProducts = this.state.oldProducts;
    const product = this.state.product;
    const brands = this.state.brands;
    const cartItems = this.state.cartItems;
    if(cartItems.length > 0) localStorage.setItem('cart_items', JSON.stringify(cartItems));
    else {
      if (localStorage.getItem('cart_items')) localStorage.removeItem('cart_items');
    }

    return (
      <Router>
          <Header />
        <div className="container" style={{ marginTop:'70px' }}>
          <Route exact path="/" render={props => (
              <Home 
                  products={products.length > 0 ? products : oldProducts} 
                  onClick={this.onClick} 
                  all_brands={brands} 
                  showProduct={this.showProduct}
                  fetchProductByBrand={this.fetchProductByBrand}
                  fetchProductPlageOfPrice={this.fetchProductPlageOfPrice}
                  addToCart={this.addToCart}
                  removeItemFromCart={this.removeItemFromCart}
                  cartItems={cartItems}
              />
          )} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/show_product" component={ProductDetails} product={product}  />
          <Route path="/admin/categories" component={Categories}  />
          <Route path="/cart" component={ShoppinCart} render={props => (
            <ShoppinCart testClick={this.testClick}  />
          )} />
        </div>
          <Footer />
      </Router>
    );
  }
}

export default App;
