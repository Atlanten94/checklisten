
//__________________________________________A U F N A H M E D I E N S T _________________________________________

document.getElementById('aufnahme_1').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Aufnahmedienst-panel-body1');
    var panelIcon = document.getElementById('aufgaben-Aufnahmedienst-panel-icon1');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

document.getElementById('aufnahme_2').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Aufnahmedienst-panel-body2');
    var panelIcon = document.getElementById('aufgaben-Aufnahmedienst-panel-icon2');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

document.getElementById('aufnahme_3').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Aufnahmedienst-panel-body3');
    var panelIcon = document.getElementById('aufgaben-Aufnahmedienst-panel-icon3');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

document.getElementById('aufnahme_4').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Aufnahmedienst-panel-body4');
    var panelIcon = document.getElementById('aufgaben-Aufnahmedienst-panel-icon4');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

document.getElementById('aufnahme_5').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Aufnahmedienst-panel-body5');
    var panelIcon = document.getElementById('aufgaben-Aufnahmedienst-panel-icon5');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

//-----------------------------------------------------------------------------------

document.getElementById('aufgaben-Basisdienst').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Basisdienst-panel-body');
    var panelIcon = document.getElementById('aufgaben-Basisdienst-panel-icon');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

document.getElementById('aufgaben-Therapeutischerdienst').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Therapeutischerdienst-panel-body');
    var panelIcon = document.getElementById('aufgaben-Therapeutischerdienst-panel-icon');
    
    // Toggle display of the panel body
    if (panelBody.style.display === 'none' || panelBody.style.display === '') {
        panelBody.style.display = 'block';
    } else {
        panelBody.style.display = 'none';
    }
    
    // Toggle rotation of the icon
    if (panelIcon.style.transform === 'rotate(180deg)') {
        panelIcon.style.transform = 'rotate(0deg)';
    } else {
        panelIcon.style.transform = 'rotate(180deg)';
    }
});

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

