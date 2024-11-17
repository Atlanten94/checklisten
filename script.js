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

// Laden der Fortschritte für Checkboxen im Spätdienst
function loadProgress() {
    const progressRef = ref(database, 'pflegeformularFrüh/progress'); // Pfad für Fortschritte
    get(progressRef).then((snapshot) => {
        if (snapshot.exists()) {
            const progress = snapshot.val();

            // Checkboxen aktualisieren
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = progress.checkboxes?.[checkbox.name] || false;
            });

            // Textinputs aktualisieren
            const textInputs = document.querySelectorAll('input[type="text"]');
            textInputs.forEach(input => {
                input.value = progress.textInputs?.[input.name] || '';
            });
        }
    }).catch((error) => {
        console.error('Fehler beim Laden des Fortschritts:', error);
    });
}


// Speichern der Fortschritte für Checkboxen
function saveProgress() {
    // Fortschritte für Checkboxen erfassen
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxProgress = {};
    checkboxes.forEach(checkbox => {
        checkboxProgress[checkbox.name] = checkbox.checked;
    });

    // Fortschritte für Textinputs erfassen
    const textInputs = document.querySelectorAll('input[type="text"]');
    const textInputProgress = {};
    textInputs.forEach(input => {
        textInputProgress[input.name] = input.value;
    });

    // Fortschritte in der Datenbank speichern
    const progress = {
        checkboxes: checkboxProgress,
        textInputs: textInputProgress
    };

    set(ref(database, 'pflegeformularFrüh/progress'), progress)
        .then(() => {
            console.log('Fortschritt erfolgreich gespeichert.');
        })
        .catch((error) => {
            console.error('Fehler beim Speichern des Fortschritts:', error);
        });
}


// Zurücksetzen der Checkboxen Nachtdienst
function resetFrühdienst() {
    // Checkboxen zurücksetzen
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Textinputs zurücksetzen
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.value = '';
    });

    // Fortschritte in der Datenbank zurücksetzen
    remove(ref(database, 'pflegeformularFrüh/progress'))
        .then(() => {
            alert('Kontrollkästchen und Texteingaben erfolgreich zurückgesetzt!');
        })
        .catch((error) => {
            alert('Fehler beim Zurücksetzen der Kontrollkästchen und Texteingaben.');
            console.error(error);
        });
}


// DOMContentLoaded Event für Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();  // Checkboxen laden
    
    // Checkboxen speichern, wenn sie geändert werden
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveProgress);
    });
    document.querySelectorAll('input[type="text"]').forEach(textInput => {
    textInput.addEventListener('input', saveProgress); // Bei Texteingabe speichern
    });

    // Reset-Button
    document.getElementById('resetBtnFr').addEventListener('click', () => {
        resetFrühdienst();
    });

    // Speichern der Fortschritte und Text-Inputs (falls nötig)
    document.getElementById('saveBtn').addEventListener('click', () => {
        saveProgress();
    });
});



    



