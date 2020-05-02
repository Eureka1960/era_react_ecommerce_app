import React, { Component } from 'react'
import 'bootstrap-4-react';
import '../../Main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCaretDown, faIcons } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ListCategory from './ListCategory';

export class Header extends Component {
  constructor(props){
    super(props)
      this.state = {
        categories:[],
        navItem:[]
      }
  }

  componentDidMount(){
    Axios.get("http://localhost:8000/api/categories/nav_categorie")
      .then(resp => {

        this.setState({categories:resp.data})
        this.state.categories.map(category => {
          if (category.parent === 0) {
            this.setState({navItem:this.state.categories})
          }
        })

      })
      .catch(err => console.log(err));
  }

  render() {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand fixed-top navbar-dark bg-primary">
            <Link to="/" className="navbar-brand">
              Tosomba.
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
              <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/" style={linkStyle} className="nav-link">
                    Acceuil <span className="sr-only">(current)</span>
                  </Link>
                </li>
                {
                  this.state.categories.map(category => (
                      <ListCategory category={category} key={category.id} />
                  ))
                }
                
                <li>
                  <Link to="/cart" style={linkStyle} className="nav-link">
                    Panier
                  </Link>
                </li>
              </ul>
            </div>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Recherche..." aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Recherche</button>
              </form>
            </nav>
            <div id="headerWrapper">
              <div id="backLogo"></div>
              <div id="logoText"></div>
              <div id="foreLogo"></div>
            </div>

            {/* <Navbar expand="lg" dark bg="primary" mb="3">
              
              <Navbar.Brand href="/">Tosomba.</Navbar.Brand>
            <Navbar.Toggler target="#navbarColor2" />
            <Collapse navbar id="navbarColor2">
                <Navbar.Nav mr="auto">
                <Link to="/" style={linkStyle}>
                  <Nav.ItemLink active>Home</Nav.ItemLink>
                </Link>
                
                <Nav.ItemLink>Blog</Nav.ItemLink>
                
                <Nav.ItemLink href="#">Contact</Nav.ItemLink>
                
                <Nav.ItemLink >About</Nav.ItemLink>
                </Navbar.Nav>
                <Form inline my="2 lg-0">
                <Form.Input type="search" placeholder="Search" mr="sm-2" />
                <Button outline light my="2 sm-0">Search</Button>
                </Form>
            </Collapse>
            </Navbar> */}
      </React.Fragment>
    )
  }
}

const linkStyle = {
  textDecoration:'none'
}


// window.addEventListener('scroll', e => {
//   const wdiv = document.getElementById('headerWrapper');
//   const divHeight = parseInt(wdiv.clientHeight.toString());
//   const test = window.screenTop
//   console.log(test);
  
//   // wdiv.style.transform = `translate(0px, ${divHeight / 2}px)`

//   // let num = window.screenX
//   // console.log(num)

//   // let vscroll = this.scrollTop();
//   console.log(wdiv);
// })

export default Header
