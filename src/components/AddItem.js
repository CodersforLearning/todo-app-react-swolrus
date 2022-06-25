import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import {ReactComponent as IconAdd} from './icons/plus.svg';

export default function AddItem() {
    const [title, setTitle] = React.useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== "") {
            await addDoc(collection(db, "items"), {
                title,
                priority: 0,
                completed: false,
            });
            setTitle("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <span className="input_container">
                <label>
                <svg viewBox="0 0 100 100" width="16px">
                    <g>
                        <path id="svg_2" d="m0,38l37,0l11,-38l11,38l37,0l-30,23l11,38l-30,-23l-30,23l11,-38l-30,-23l0,0z" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" fill="#ffffff" />
                    </g>
                </svg>
                </label>
                <input
                    type="text"
                    placeholder="Enter todo..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </span>
            <span className="btn_container">
                <button><IconAdd /></button>
            </span>
        </form>
    );
}
