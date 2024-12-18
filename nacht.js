import { checkAuthentication, database, ref, set, get, remove } from './auth.js';

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
