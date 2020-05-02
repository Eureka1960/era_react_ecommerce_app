import React from 'react'

export default function ListCategory(props) {
    const {name} = props.category;
  return (
    <li className="nav-item">
        <a className="dropdown-toggle nav-link" data-toggle="drodpdown" href="#link" >{name}</a>
        <ul className="dropdown-menu" role="menu">
        <li><a href="Link">Child One</a></li>
        </ul>
        {/* <Link to={`/${category.name}`} style={linkStyle}>
        </Link> */}
    </li>
  )
}
