import React from "react";
import './App.css';
import Title from './components/Title';
import AddItem from './components/AddItem';
import Item from './components/Item';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        const q = query(collection(db, "items"), orderBy("priority", "desc"));
        onSnapshot(q, (querySnapshot) => {
            let itemsArray = [];
            querySnapshot.forEach((doc) => {
                itemsArray.push({...doc.data(), id: doc.id});
            })
            setItems(itemsArray);
        })
    }, []);

    const toggleComplete = async (item, title) => {
        await updateDoc(doc(db, "items", item.id), {
            completed: !item.completed,
        });
    };

    const cyclePriority = async (item, title) => {
        await updateDoc(doc(db, "items", item.id), {
            priority: (item.priority + 1) % 3,
        });
    };

    const handleEdit = async (item, title) => {
        await updateDoc(doc(db, "items", item.id), { title: title });
    };

    const handleDelete = async (item, title) => {
        await deleteDoc(doc(db, "items", item.id));
    };

    return (
        <div className="App">
            <header className="wrapper">
                <Title />
            </header>
            <main className="wrapper">
                <aside>
                    <AddItem />
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
            </main>
        </div>
    );
}

export default App;
