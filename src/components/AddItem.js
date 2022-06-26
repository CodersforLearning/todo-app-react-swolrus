import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import {ReactComponent as IconAdd} from '../icons/plus.svg';

export default function AddItem({ loggedin }) {
    const [title, setTitle] = React.useState("");
    const d = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== "") {
            let t = title;
            let a = false;
            if (loggedin) a = !a;
            setTitle("");
            await addDoc(collection(db, "items"), {
                title: t,
                priority: 0,
                completed: false,
                authed: a,
                timeCreated: d.getTime(),
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="additem form-inline">
                <button className="btn btn__clear btn__plus"><IconAdd /></button>
                <span style={{width:"12px"}}></span>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter what he didn't done this time..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>
        </form>
    );
}
