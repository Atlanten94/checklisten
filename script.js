// Your web app's Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Benutzer nicht eingeloggt, zurück zur Login-Seite
        window.location.href = '/login.html';
    }
});

// Firebase-Konfiguration und Initialisierung
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth };

// Speichern Fortschritt von Frühdienst -- pflegeformularFrüh
function saveProgressFrüh() {
    const checkboxesFrüh = document.querySelectorAll('input[type="checkbox"]');
    const progressFrüh = {};

    checkboxesFrüh.forEach(checkbox => {
        progressFrüh[checkbox.name] = checkbox.checked;
    });

    set(ref(database, 'pflegeformularFrüh/checkboxes'), progressFrüh) // Fix für korrektes Speichern der Checkbox-Daten
        .then(() => {
            console.log('Fortschritt erfolgreich gespeichert.');
        })
        .catch((error) => {
            console.error('Fehler beim Speichern des Fortschritts:', error);
        });
}
// Laden der Fortschritte für Checkboxen im Frühdienst - pflegeformularFrüh
function loadProgressFrüh() {
    const progressRefFrüh = ref(database, 'pflegeformularFrüh/checkboxes'); // Fix für den richtigen Pfad
    get(progressRefFrüh).then((snapshot) => {
        if (snapshot.exists()) {
            const progressFrüh = snapshot.val();
            const checkboxesFrüh = document.querySelectorAll('input[type="checkbox"]');

            checkboxesFrüh.forEach(checkbox => {
                checkbox.checked = progressFrüh[checkbox.name] || false;
            });
        }
    }).catch((error) => {
        console.error('Fehler beim Laden des Fortschritts:', error);
    });
}

//Frühdienst zurücksetzen______________________________________________________
function resetCheckboxesFr() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;  // Zurücksetzen der Checkboxen im DOM
    });

    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.value = '';  // Zurücksetzen der Text-Inputs im DOM
    });

    // Entfernen der Daten aus der Firebase-Datenbank
    Promise.all([
        remove(ref(database, 'pflegeformularFrüh/checkboxes')),
        remove(ref(database, 'pflegeformularFrüh/textInputs'))
    ])
    .then(() => {
        alert('Formular erfolgreich zurückgesetzt!');
    })
    .catch((error) => {
        alert('Fehler beim Zurücksetzen des Formulars.');
        console.error(error);
    });
}

// Text-Inputs speichern im Frühdienst
function saveTextInputsFrüh() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    const inputData = {};

    textInputs.forEach(input => {
        inputData[input.name] = input.value;
    });

    set(ref(database, 'pflegeformularFrüh/textInputs'), inputData) // Fix für den richtigen Pfad
        .then(() => {
            console.log('Text-Inputs erfolgreich gespeichert.');
        })
        .catch((error) => {
            console.error('Fehler beim Speichern der Text-Inputs:', error);
        });
}

// Text-Inputs laden im Frühdienst
function loadTextInputsFrüh() {
    const textInputsRef = ref(database, 'pflegeformularFrüh/textInputs');
    get(textInputsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const inputData = snapshot.val();
            const textInputs = document.querySelectorAll('input[type="text"]');

            textInputs.forEach(input => {
                input.value = inputData[input.name] || '';
            });
        }
    }).catch((error) => {
        console.error('Fehler beim Laden der Text-Inputs:', error);
    });
}

// DOMContentLoaded Event für Initialisierung Frühdienst
document.addEventListener('DOMContentLoaded', () => {
    loadProgressFrüh() // Checkboxen Frühdienst laden
    loadTextInputsFrüh();  // Text-Inputs Frühdienstladen

    // Text-Inputs speichern, wenn der Benutzer tippt
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('input', saveTextInputsFrüh);
    });
     document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveProgressFrüh);
    });
    
// Reset-Button
    document.getElementById('resetBtnFr').addEventListener('click', () => {
        resetCheckboxesFr();
    });
    });


    



