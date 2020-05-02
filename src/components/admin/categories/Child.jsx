import React from 'react'

export default function Child(props) {
    return (
        <tr>
            <td>{props.child.name}</td>
            <td>{props.parent_name}</td>
            <td>
            <button type="button" className="btn btn-xs btn-default" onClick={props.editCategory.bind(this, props.child.id)} ><span>✍</span></button>
            <button className="btn btn-xs btn-default"><span>♻</span></button>
            </td>
        </tr>
    )
}
