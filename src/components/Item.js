import React from "react";

import {ReactComponent as IconEdit} from '../icons/update.svg';
import {ReactComponent as IconDelete} from '../icons/delete.svg';
import {ReactComponent as IconCheck} from '../icons/checkbox.svg';
import {ReactComponent as IconChecked} from '../icons/checkedbox.svg';
import {ReactComponent as IconStar} from '../icons/star.svg';
import {ReactComponent as IconExclamation} from '../icons/exclamation.svg';

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

    function Priority() {
        let fill = "";
        switch (item.priority) {
            case 1:
                fill =  item.completed === true ? "#C7C7C7" :
                            "#FFDC63";
                return (
                        <IconStar style={{fill: fill}}/>
                        );
            case 2:
                fill =  item.completed === true ? "#AFAFAF" :
                            "#FF9840";
                return (
                        <IconStar style={{fill: fill}}/>
                        );
            case 3:
                fill =  item.completed === true ? "#707070" :
                        "#FF6361";
                return (
                        <IconExclamation style={{fill: fill}}/>
                        );
            default:
                return (
                        <IconStar style={{fill: "#DDDDDD"}}/>
                        );

        }
    }

    function Checked() {
        if (item.completed)
            return (<IconChecked />);
        else
            return (<IconCheck />);
    }
    var c = "#000000";
    if (!item.authed)
        c = "#575757";

    return (
            <div className="form-inline">
                <button
                    className="btn btn__clear"
                    onClick={() => toggleComplete(item)}
                ><Checked /></button>

                <button className="btn btn__clear" onClick={() => cyclePriority(item)}>
                    <Priority />
                </button>
                <div className="input-wrapper">
                <input
                    style={{ textDecoration: item.completed && "line-through", "color": c }}
                    type="text"
                    value={item.title === "" ? newTitle : item.title}
                    className="list"
                    onChange={handleChange}
                />
                </div>

                <button
                    className="btn"
                    onClick={() => handleEdit(item, newTitle)}
                ><IconEdit /></button>

                <button
                    className="btn btn__red"
                    onClick={() => handleDelete(item)}
                ><IconDelete /></button>
            </div>
            );
}
