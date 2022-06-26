import React, { useState } from 'react';

export default function Login({ loginEmailAndPassword }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // uses passed function to login back inside app.js
    return (
        <form onSubmit={loginEmailAndPassword} className="login__wrapper">
            <h3>Log In To Manage</h3>
            <input 
            type="text"
            placeholder="Email..."
            onChange={ (e) => setUserName(e.target.value) }
            />
            <input 
            type="password"
            placeholder="Password..."
            onChange={ (e) => setPassword(e.target.value) }
            />
            <button
            className="btn"
            style={{padding:""}}
            onClick={ () => loginEmailAndPassword(username, password) }
            >
                Submit
            </button>
        </form>
    );
}
