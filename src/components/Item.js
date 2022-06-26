import React from "react";

import {ReactComponent as IconCheck} from './icons/task_done.svg';
import {ReactComponent as IconEdit} from './icons/update.svg';
import {ReactComponent as IconDelete} from './icons/delete.svg';

export default function Item({
    item,
    toggleComplete,
    cyclePriority,
    handleDelete,
    handleEdit,
}) {
    const [newTitle, setNewTitle] = React.useState(item.title);

    const handleChange = (e) => {
        e.preventDefault();
        if (item.complete === true) {
            setNewTitle(item.title);
        } else {
            item.title = "";
            setNewTitle(e.target.value);
        }
    }

    const fill =    item.priority === 0 ? "#dddddd" :
                    item.priority === 1 ? "#FFE800" :
                    "#FF6361";

    return (
        <div className="form-inline">
            <label id="priority" onClick={() => cyclePriority(item)}>
                <svg viewBox="0 0 100 100" width="16px">
                    <g>
                        <path id="svg_2" d="m0,38l37,0l11,-38l11,38l37,0l-30,23l11,38l-30,-23l-30,23l11,-38l-30,-23l0,0z" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill={fill} />
                    </g>
                </svg>
            </label>
            <div className="input-wrapper">
            <input
                style={{ textDecoration: item.completed && "line-through" }}
                type="text"
                value={item.title === "" ? newTitle : item.title}
                className="list"
                onChange={handleChange}
            />
            </div>
            <button
                className="button-complete"
                onClick={() => toggleComplete(item)}
            ><IconCheck /></button>

            <button
                className="button-edit"
                onClick={() => handleEdit(item)}
            ><IconEdit /></button>

            <button
                className="button-delete"
                onClick={() => handleDelete(item)}
            ><IconDelete /></button>
        </div>
    );
}
