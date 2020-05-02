import React from 'react'
import ChildCategory from './ChildCategory'

export default function Category(props) {
    return (
            <React.Fragment>
                <tr className="bg-primary text-white">
                    <td>{props.category.name}</td>
                    <td>Parent</td>
                    <td>
                        <button type="button" className="btn btn-xs btn-default" onClick={props.editCategory.bind(this, props.category.id)} ><span>✍</span></button>
                        <button type="button" className="btn btn-xs btn-default"><span>♻</span></button>
                    </td>
                </tr>
                <ChildCategory parent_id={props.category.id} parent_name={props.category.name} editCategory={props.editCategory} />
                {/* <Child parent_id={props.category.id} parent_name={props.category.name} /> */}
            </React.Fragment>
    )
}
