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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progress = {};

    checkboxes.forEach(checkbox => {
    progress[checkbox.name] = checkbox.checked;
    });

    set(ref(database, 'pflegeformular'), progress)
    .then(() => {
    console.log('Fortschritt erfolgreich gespeichert.');
    })
    .catch((error) => {
    console.error('Fehler beim Speichern des Fortschritts:', error);
    });
}

function loadProgress() {
const progressRef = ref(database, 'pflegeformular');
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

function resetCheckboxes() {
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.checked = false;
});

remove(ref(database, 'pflegeformular'))
    .then(() => {
    alert('Kontrollkästchen erfolgreich zurückgesetzt!');
    })
    .catch((error) => {
    alert('Fehler beim Zurücksetzen der Kontrollkästchen.');
    console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
loadProgress();
loadTextInputs();
    
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', saveProgress);
});

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', saveTextInputs);
});

document.getElementById('resetBtn').addEventListener('click', () => {
    resetCheckboxes();
    resetTextInputs();
    });

document.getElementById('saveBtn').addEventListener('click', () => {
    saveProgress();
    saveTextInputs();
    });

});

//_______________ T E X T   I N P U T S ____________________
// Text-Inputs speichern
function saveTextInputs() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    const inputData = {};

    textInputs.forEach(input => {
        inputData[input.name] = input.value;
    });

    set(ref(database, 'pflegeformular/textInputs'), inputData)
    .then(() => {
        console.log('Text-Inputs erfolgreich gespeichert.');
    })
    .catch((error) => {
        console.error('Fehler beim Speichern der Text-Inputs:', error);
    });
}

// Text-Inputs laden
function loadTextInputs() {
    const textInputsRef = ref(database, 'pflegeformular/textInputs');
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

// Zurücksetzen der Text-Inputs
function resetTextInputs() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.value = '';
    });

    remove(ref(database, 'pflegeformular/textInputs'))
    .then(() => {
        alert('Text-Inputs erfolgreich zurückgesetzt!');
    })
    .catch((error) => {
        alert('Fehler beim Zurücksetzen der Text-Inputs.');
        console.error(error);
    });
}
