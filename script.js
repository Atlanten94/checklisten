// Firebase-Konfiguration und Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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

// Authentifizierungsprüfung und Initialisierung
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Benutzer eingeloggt:", user.email);
        initializeForm();
    } else {
        console.log("Kein Benutzer eingeloggt. Weiterleitung zur Login-Seite.");
        window.location.href = '/login.html';
    }
});

// Funktion zur Initialisierung des Formulars
function initializeForm() {
    document.addEventListener('DOMContentLoaded', () => {
        // Laden der gespeicherten Daten
        loadProgressFrüh();
        loadTextInputsFrüh();

        // Event-Listener für Änderungen an den Text-Inputs
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.addEventListener('input', saveTextInputsFrüh);
        });

        // Event-Listener für Änderungen an den Checkboxen
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', saveProgressFrüh);
        });

        // Reset-Button-Funktionalität
        const resetBtn = document.getElementById('resetBtnFr');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetCheckboxesFr);
        }
    });
}

// Fortschritt der Checkboxen speichern
function saveProgressFrüh() {
    const checkboxesFrüh = document.querySelectorAll('input[type="checkbox"]');
    const progressFrüh = {};

    checkboxesFrüh.forEach(checkbox => {
        progressFrüh[checkbox.name] = checkbox.checked;
    });

    set(ref(database, 'pflegeformularFrüh/checkboxes'), progressFrüh)
        .then(() => console.log('Fortschritt erfolgreich gespeichert.'))
        .catch((error) => console.error('Fehler beim Speichern des Fortschritts:', error));
}

// Fortschritt der Checkboxen laden
function loadProgressFrüh() {
    const progressRefFrüh = ref(database, 'pflegeformularFrüh/checkboxes');
    get(progressRefFrüh)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const progressFrüh = snapshot.val();
                const checkboxesFrüh = document.querySelectorAll('input[type="checkbox"]');

                checkboxesFrüh.forEach(checkbox => {
                    checkbox.checked = progressFrüh[checkbox.name] || false;
                });
            }
        })
        .catch((error) => console.error('Fehler beim Laden des Fortschritts:', error));
}

// Text-Inputs speichern
function saveTextInputsFrüh() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    const inputData = {};

    textInputs.forEach(input => {
        inputData[input.name] = input.value;
    });

    set(ref(database, 'pflegeformularFrüh/textInputs'), inputData)
        .then(() => console.log('Text-Inputs erfolgreich gespeichert.'))
        .catch((error) => console.error('Fehler beim Speichern der Text-Inputs:', error));
}

// Text-Inputs laden
function loadTextInputsFrüh() {
    const textInputsRef = ref(database, 'pflegeformularFrüh/textInputs');
    get(textInputsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const inputData = snapshot.val();
                const textInputs = document.querySelectorAll('input[type="text"]');

                textInputs.forEach(input => {
                    input.value = inputData[input.name] || '';
                });
            }
        })
        .catch((error) => console.error('Fehler beim Laden der Text-Inputs:', error));
}

// Formular zurücksetzen
function resetCheckboxesFr() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);

    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => input.value = '');

    // Daten aus der Firebase-Datenbank entfernen
    Promise.all([
        remove(ref(database, 'pflegeformularFrüh/checkboxes')),
        remove(ref(database, 'pflegeformularFrüh/textInputs'))
    ])
        .then(() => alert('Formular erfolgreich zurückgesetzt!'))
        .catch((error) => {
            alert('Fehler beim Zurücksetzen des Formulars.');
            console.error(error);
        });
}



    



