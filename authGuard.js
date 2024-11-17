import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Benutzer nicht eingeloggt, zurück zur Login-Seite
        window.location.href = '/login.html';
    }
});