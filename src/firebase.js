import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP2_t81InQz4MjuW0M2TO8np9D75KHJ4Y",
  authDomain: "todo-e3911.firebaseapp.com",
  databaseURL: "https://todo-e3911-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-e3911",
  storageBucket: "todo-e3911.appspot.com",
  messagingSenderId: "548242103446",
  appId: "1:548242103446:web:d5918fff979aa2c423b6b7",
  measurementId: "G-T7F5QPX5R7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };
