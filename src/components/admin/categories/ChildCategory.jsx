import React, { Component } from 'react'
import Axios from 'axios'
import Child from './Child';

export class ChildCategory extends Component {
    state = {
        id:this.props.parent_id,
        children:[]
    }

    componentDidMount(){
        Axios.get(`http://127.0.0.1:8000/api/category/child/${this.state.id}`).then(resp => this.setState({children:resp.data}));
    }

  render() {
    return (
        this.state.children.map(child => (
            <Child parent_name={this.props.parent_name} child={child} key={child.id} editCategory={this.props.editCategory}  />
        ))
    )
  }
}

export default ChildCategory
