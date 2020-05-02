import React, { Component } from 'react'
import Axios from 'axios'
import Parent from './categories/Parent';
// import glyphicons from 'glyphicons'

export class Categories extends Component {

    state = {
        parent:0,
        name:'',
        categories:[],
        category:{}
    }

    refreshCategories = data => {
        this.setState({categories:[...data]});
    }

    componentDidMount(){    
        Axios.get("http://127.0.0.1:8000/api/categories")
            .then(resp => this.refreshCategories(resp.data))
            .catch(err => console.log(err));
    }

    selectCategoryById = id => {
        Axios.get(`http://127.0.0.1:8000/api/category/${id}`).then(resp => this.setState({category:resp.data}));
    }
    onChangeFieldValue = e => this.setState({[e.target.name] : e.target.value});

    errorDisplay = (elementId, message, valid) => {
        const el = document.getElementById(elementId);
        if (!valid) {
            el.style.color = 'red';
            el.innerText = message;
        } else el.innerText = "";
    }
    
    onSubmitForm = e => {
        e.preventDefault();        
        let isFomValid = false;

        if (this.state.name === ""){
            isFomValid = false
            this.errorDisplay("name_error", "Veuillez saisir une catégorie !", isFomValid);
        } else {
            isFomValid = true;
            this.errorDisplay("name_error", "", isFomValid);
        }

        if (parseInt(this.state.parent) === 0){
            this.errorDisplay("parent_error", "Veuillez selectionner un parent");
            isFomValid = false;
        } else {
            isFomValid = true;
            this.errorDisplay("parent_error", "", isFomValid);
        }

        if (isFomValid){
            const form = document.getElementById('categoryForm');
            let formData = {};
            for(let el of form){
                if (el.type !== "submit")
                    formData[el.name] = el.value;
            }

            form.reset();
            Axios.post("http://127.0.0.1:8000/api/category", formData)
                .then(resp => this.refreshCategories(resp.data))
                .catch(err => console.log(err))
            
                this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Categories Management</h1>
                <div className="row">
                    <div className="col-6">
                        {/* form */}
                        <form onSubmit={this.onSubmitForm} id="categoryForm" >
                            <legend>Ajouter catégorie</legend>
                            <div className="form-group">
                                <select name="parent" className="form-control" value={this.state.parent} onChange={this.onChangeFieldValue} >
                                    <option value="0" selected={this.state.category === {} ? this.state.category.parent === 0 ? "selected"  : 'selected' : ''} >Parent</option>
                                    {
                                        this.state.categories.map(category => (
                                            <option value={category.id} selected={this.state.category === {} ? category.id ===  this.state.category.parent? "selected"  : 'selected' : ''} key={category.id} >{category.name}</option>
                                        ))
                                    }
                                </select>
                                <span id="parent_error"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Category</label>
                                <input type="text" name="name" className="form-control" value={this.state.category === {} ? this.state.name : this.state.category.name} onChange={this.onChangeFieldValue} />
                                <span id="name_error"></span>
                            </div>
                            <div className="from-group">
                                <input type="submit" value="Add Category" className="btn btn-success"/>
                            </div>
                        </form>
                    </div>
                    <div className="col-6">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Category</th><th>Parent</th><th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.categories.map(category => (                                       
                                        <Parent category={category}  key={category.id} editCategory={this.selectCategoryById} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Categories
