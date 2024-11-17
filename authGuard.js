import { auth } from './script.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Benutzer nicht eingeloggt, zurück zur Login-Seite
        window.location.href = '/login.html';
    }
});
