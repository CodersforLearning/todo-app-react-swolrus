import React from "react";
import './App.css';

import Title from './components/Title';
import AddItem from './components/AddItem';
import Item from './components/Item';
import Login from './components/Login';
import {
    collection,
    query,
    onSnapshot,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

import { db, auth } from "./firebase";

function App() {

    const [items, setItems] = React.useState([]);
    const [loggedin, setLoggedin] = React.useState("");

    const d = new Date();

    function compare( a, b ) {
        if (a.completed)
            return 1;
        if (b.completed)
            return -1;
        if (a.priority < b.priority)
            return 1;
        if (a.priority > b.priority)
            return -1;
        if (a.timeCreated < b.timeCreated)
            return -1;
        if (a.timeCreated > b.timeCreated)
            return 1;
        return 0;
    }

    React.useEffect(() => {
        const q = query(collection(db, "items"));
        onSnapshot(q, (querySnapshot) => {
            let itemsArray = [];
            querySnapshot.forEach((doc) => {
                itemsArray.push({...doc.data(), id: doc.id});
            });
            itemsArray.sort(compare);
            setItems(itemsArray);
        })
    }, []);

    const toggleComplete = async (item, title) => {
        if (loggedin) {
            await updateDoc(doc(db, "items", item.id), {
                completed: !item.completed,
                timeCompleted: d.getTime(),
            });
        }
    }

    const cyclePriority = async (item, title) => {
        await updateDoc(doc(db, "items", item.id), {
            priority: (item.priority + 1) % 4,
        });
    }

    const handleEdit = async (item, title) => {
        if (loggedin) {
            await updateDoc(doc(db, "items", item.id), { title: title });
        }
    }

    const handleDelete = async (item, title) => {
        if (loggedin) {
            let c = -1;
            if (item.completed)
                c = item.timeCompleted;
            await addDoc(collection(db, "completed"), {
                title: item.title,
                priority: item.priority,
                timeCreated: item.timeCreated,
                timeCompleted: c,
                authed: true,
                completed: true,
            })
            
            await deleteDoc(doc(db, "items", item.id));
        }
    }

    const loginEmailAndPassword = async (username, password) => {
        // this hardcoded value is for ease of use uncomment as directed inside Login.js
        // also modify this to take two inputs and the first (username) can replace string
        signInWithEmailAndPassword(auth, username, password)
        .then(function(firebaseUser) {
            setLoggedin(true);
        })
        .catch(function(error) {
            setLoggedin(false);
        });
    }

    function NeedLogin() {
        if (loggedin) {
            return
        } else {
            return (
                <Login loginEmailAndPassword={loginEmailAndPassword} />
            );
        }
    }


    return (
            <div className="App">
                    <header className="wrapper">
                        <Title />
                    </header>
                    <main className="wrapper">
                        <aside>
                            <AddItem loggedin={loggedin}/>
                        </aside>
                        <section>
                            {items.map((item) => (
                                <Item
                                    key={item.id}
                                    item={item}
                                    toggleComplete={toggleComplete}
                                    cyclePriority={cyclePriority}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                            ))}
                        </section>
                        <NeedLogin />
                    </main>
                </div>
    );
}

export default App;
