// Your web app's Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

// Universelle Funktionen
/**
 * Speichert den Zustand von Checkboxen in Firebase.
 * @param {string} path - Der Pfad in der Firebase-Datenbank.
 */
function saveCheckboxProgress(path) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progress = {};

    checkboxes.forEach(checkbox => {
        progress[checkbox.name] = checkbox.checked;
    });

    set(ref(database, path), progress)
        .then(() => console.log('Fortschritt erfolgreich gespeichert:', path))
        .catch((error) => console.error('Fehler beim Speichern des Fortschritts:', error));
}

/**
 * Lädt den Zustand von Checkboxen aus Firebase.
 * @param {string} path - Der Pfad in der Firebase-Datenbank.
 */
function loadCheckboxProgress(path) {
    const progressRef = ref(database, path);
    get(progressRef).then((snapshot) => {
        if (snapshot.exists()) {
            const progress = snapshot.val();
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = progress[checkbox.name] || false;
            });
        } else {
            console.warn('Keine Daten gefunden:', path);
        }
    }).catch((error) => console.error('Fehler beim Laden der Checkbox-Daten:', error));
}

/**
 * Setzt Checkboxen und zugehörige Daten in Firebase zurück.
 * @param {string} path - Der Pfad in der Firebase-Datenbank.
 */
function resetCheckboxes(path) {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    remove(ref(database, path))
        .then(() => alert('Checkboxen erfolgreich zurückgesetzt!'))
        .catch((error) => console.error('Fehler beim Zurücksetzen der Checkboxen:', error));
}

/**
 * Speichert den Zustand von Textfeldern in Firebase.
 * @param {string} path - Der Pfad in der Firebase-Datenbank.
 */
function saveTextInputs(path) {
    const textInputs = document.querySelectorAll('input[type="text"]');
    const inputData = {};

    textInputs.forEach(input => {
        inputData[input.name] = input.value;
    });

    set(ref(database, path), inputData)
        .then(() => console.log('Text-Inputs erfolgreich gespeichert:', path))
        .catch((error) => console.error('Fehler beim Speichern der Text-Inputs:', error));
}

/**
 * Lädt den Zustand von Textfeldern aus Firebase.
 * @param {string} path - Der Pfad in der Firebase-Datenbank.
 */
function loadTextInputs(path) {
    const textInputsRef = ref(database, path);
    get(textInputsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const inputData = snapshot.val();
            document.querySelectorAll('input[type="text"]').forEach(input => {
                input.value = inputData[input.name] || '';
            });
        } else {
            console.warn('Keine Daten gefunden:', path);
        }
    }).catch((error) => console.error('Fehler beim Laden der Text-Inputs:', error));
}

/**
 * Setzt Textfelder und zugehörige Daten in Firebase zurück.
 * @param {string} path - Der Pfad in der Firebase-Datenbank.
 */
function resetTextInputs(path) {
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.value = '';
    });

    remove(ref(database, path))
        .then(() => alert('Text-Inputs erfolgreich zurückgesetzt!'))
        .catch((error) => console.error('Fehler beim Zurücksetzen der Text-Inputs:', error));



document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('Nachdienst.html')) {
        const checkboxPath = 'pflegeformular/checkboxes';
        const textInputPath = 'pflegeformular/textInputs';

        // Fortschritt laden
        loadCheckboxProgress(checkboxPath);
        loadTextInputs(textInputPath);

        // Checkbox-Events
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => saveCheckboxProgress(checkboxPath));
        });

        // Text-Input-Events
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.addEventListener('input', () => saveTextInputs(textInputPath));
        });

        // Reset-Button
        document.getElementById('resetBtn')?.addEventListener('click', () => {
            resetCheckboxes(checkboxPath);
            resetTextInputs(textInputPath);
        });
    } else if (window.location.pathname.includes('frühdienst.html')) {
        const checkboxPath = 'pflegeformularFrüh/checkboxes';
        const textInputPath = 'pflegeformularFrüh/textInputs';

        // Fortschritt laden
        loadCheckboxProgress(checkboxPath);
        loadTextInputs(textInputPath);

        // Checkbox-Events
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => saveCheckboxProgress(checkboxPath));
        });

        // Text-Input-Events
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.addEventListener('input', () => saveTextInputs(textInputPath));
        });

        // Reset-Button
        document.getElementById('resetBtnFr')?.addEventListener('click', () => {
            resetCheckboxes(checkboxPath);
            resetTextInputs(textInputPath);
        });
    }
});

    



