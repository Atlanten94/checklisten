import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Firebase-Konfiguration
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

// Firebase-Initialisierung
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Funktion zur Authentifizierungsprüfung
export function checkAuthentication() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // Kein Benutzer eingeloggt, Weiterleitung zur Login-Seite
            alert('Bitte loggen Sie sich ein.');
            window.location.href = "login.html";
        }
    });
}

// Logout-Funktion (optional)
export function logout() {
    signOut(auth)
        .then(() => {
            console.log('Erfolgreich ausgeloggt.');
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error('Fehler beim Logout:', error.message);
        });
}

// Exporte für die anderen Dateien
export { auth, database };
