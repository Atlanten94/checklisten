// Your web app's Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3a7mBkYun-pW-reZ90qDzWKxM-Nntbc0",
    authDomain: "dienstaufgaben-42703.firebaseapp.com",
    databaseURL: "https://dienstaufgaben-42703-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dienstaufgaben-42703",
    storageBucket: "dienstaufgaben-42703.appspot.com",
    messagingSenderId: "308022795905",
    appId: "1:308022795905:web:8d395d93530aaf368ef780",
    measurementId: "G-WDLP80WGEB"
};

// Firebase-Konfiguration und Initialisierung
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { auth };
