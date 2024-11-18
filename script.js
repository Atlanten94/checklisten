import { checkAuthentication, database, ref, set, get, remove } from './auth.js';
import { logout } from './auth.js';
import { updatePassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from './auth.js';

// Laden der Fortschritte für Checkboxen und Textinputs
function loadProgress() {
    const progressRef = ref(database, 'pflegeformularFrüh/progress'); // Pfad für Fortschritte
    get(progressRef).then((snapshot) => {
        if (snapshot.exists()) {
            const progress = snapshot.val();

            // Textinputs aktualisieren
            const textInputs = document.querySelectorAll('input[type="text"]');
            textInputs.forEach(input => {
                input.value = progress.textInputs?.[input.name] || '';
            });

            // Checkboxen aktualisieren
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = progress.checkboxes?.[checkbox.name] || false;
            });
        }
    }).catch((error) => {
        console.error('Fehler beim Laden des Fortschritts:', error);
    });
}

// Speichern der Fortschritte für Checkboxen und Textinputs
function saveProgress() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    const textInputProgress = {};
    textInputs.forEach(input => {
        textInputProgress[input.name] = input.value;
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxProgress = {};
    checkboxes.forEach(checkbox => {
        checkboxProgress[checkbox.name] = checkbox.checked;
    });

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

// Zurücksetzen der Fortschritte
function resetFrühdienst() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.value = '';
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    remove(ref(database, 'pflegeformularFrüh/progress'))
        .then(() => {
            alert('Kontrollkästchen und Texteingaben erfolgreich zurückgesetzt!');
        })
        .catch((error) => {
            alert('Fehler beim Zurücksetzen der Kontrollkästchen und Texteingaben.');
            console.error(error);
        });
}

//--------------------------- L O G O U T -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    if (!logoutButton) {
        console.error('Logout-Button nicht gefunden! Überprüfen Sie die ID im HTML.');
        return; // Beenden, wenn der Button nicht existiert
    }

    console.log('Logout-Button gefunden. Event-Listener wird hinzugefügt.');
    logoutButton.addEventListener('click', () => {
        logout(); // Ruft die Logout-Funktion auf
    });
});


//--------------------------- P A S S W O R T    Ä N D E R N _----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const changePasswordButton = document.getElementById('change-password-button');

    // Sicherstellen, dass der Button existiert
    if (!changePasswordButton) {
        alert('Passwort-Änderungs-Button nicht gefunden! Überprüfen Sie die ID im HTML.');
        return; // Falls Button nicht existiert, stoppen
    }

    alert('Passwort-Änderungs-Button gefunden. Event-Listener wird hinzugefügt.');

    // Event-Listener für Button hinzufügen
    changePasswordButton.addEventListener('click', (e) => {
        e.preventDefault(); // Standard-Button-Verhalten verhindern

        // Neues Passwort aus dem Eingabefeld abrufen
        const newPassword = document.getElementById('new-password')?.value;

        if (!newPassword) {
            console.error('Neues Passwort ist leer!');
            alert('Bitte geben Sie ein neues Passwort ein.');
            return;
        }

        console.log('Neues Passwort eingegeben. Änderungsprozess wird gestartet.');

        // Passwortänderungslogik
        const user = auth.currentUser;

        if (user) {
            updatePassword(user, newPassword)
                .then(() => {
                    alert('Passwort erfolgreich geändert!');
                    console.log('Passwort wurde aktualisiert.');
                })
                .catch((error) => {
                    console.error('Fehler beim Ändern des Passworts:', error.message);
                    alert(`Fehler: ${error.message}`);
                });
        } else {
            alert('Benutzer nicht eingeloggt. Bitte melden Sie sich erneut an.');
            console.error('Kein Benutzer gefunden. Passwortänderung abgebrochen.');
        }
    });
});

// DOMContentLoaded Event für Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication(); // Authentifizierung prüfen
    loadProgress();        // Daten laden

    // Event Listener für Checkboxen
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveProgress);
    });

    // Event Listener für Textinputs
    document.querySelectorAll('input[type="text"]').forEach(textInput => {
        textInput.addEventListener('input', saveProgress);
    });

    // Reset-Button
    document.getElementById('resetBtnFr').addEventListener('click', resetFrühdienst);

    // Speichern-Button
    document.getElementById('saveBtn').addEventListener('click', saveProgress);

});




    



