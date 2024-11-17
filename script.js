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

// DOMContentLoaded Event für Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();  // Checkboxen laden
    
    // Checkboxen speichern, wenn sie geändert werden
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveProgress);
    });

    // Reset-Button
    document.getElementById('resetBtn').addEventListener('click', () => {
        resetCheckboxes();
    });

    // Speichern der Fortschritte und Text-Inputs (falls nötig)
    document.getElementById('saveBtn').addEventListener('click', () => {
        saveProgress();
    });
});

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


