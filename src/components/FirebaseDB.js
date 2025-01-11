
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';

const firebaseConfig = {
        apiKey: "AIzaSyCchKcQDZfYi4lY-zvD_Hc6xxkgo7_W1IY",
        authDomain: "tohar-and-gal.firebaseapp.com",
        databaseURL: "https://tohar-and-gal-default-rtdb.firebaseio.com",
        projectId: "tohar-and-gal",
        storageBucket: "tohar-and-gal.firebasestorage.app",
        messagingSenderId: "968576493507",
        appId: "1:968576493507:web:cf59161afbd60763aa7f76",
        measurementId: "G-792XH0HZG5"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // אתחול Firebase Database

export { database, ref, push };