import { auth } from './auth.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Login
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Eingeloggt:', userCredential.user);
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error('Login fehlgeschlagen:', error.message);
            alert('Login fehlgeschlagen: ' + error.message);
        });
});

