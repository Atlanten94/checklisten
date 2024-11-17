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

// Speichern der Fortschritte für Checkboxen
function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progress = {};

    checkboxes.forEach(checkbox => {
        progress[checkbox.name] = checkbox.checked;
    });

    set(ref(database, 'pflegeformular/checkboxes'), progress) // Fix für korrektes Speichern der Checkbox-Daten
        .then(() => {
            console.log('Fortschritt erfolgreich gespeichert.');
        })
        .catch((error) => {
            console.error('Fehler beim Speichern des Fortschritts:', error);
        });
}

// Laden der Fortschritte für Checkboxen im Spätdienst
function loadProgress() {
    const progressRef = ref(database, 'pflegeformular/checkboxes'); // Fix für den richtigen Pfad
    get(progressRef).then((snapshot) => {
        if (snapshot.exists()) {
            const progress = snapshot.val();
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');

            checkboxes.forEach(checkbox => {
                checkbox.checked = progress[checkbox.name] || false;
            });
        }
    }).catch((error) => {
        console.error('Fehler beim Laden des Fortschritts:', error);
    });
}

// Zurücksetzen der Checkboxen Nachtdienst
function resetCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    })
    
    remove(ref(database, 'pflegeformular/checkboxes'))
        .then(() => {
            alert('Kontrollkästchen erfolgreich zurückgesetzt!');
        })
        .catch((error) => {
            alert('Fehler beim Zurücksetzen der Kontrollkästchen.');
            console.error(error);
        });
}
