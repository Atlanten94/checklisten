import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js";

const messaging = getMessaging();

// Hier den öffentlichen VAPID-Schlüssel einfügen
const vapidKey = "v6rGuReTu7izhd0mpaH7-K9-CUdsvzfZlDlrjhF-tP4";

// Token abrufen
getToken(messaging, { vapidKey })
    .then((currentToken) => {
        if (currentToken) {
            console.log('Token erhalten:', currentToken);
            // Token in deiner Datenbank speichern
        } else {
            console.warn('Keine Benachrichtigungsberechtigung erteilt.');
        }
    }).catch((error) => {
        console.error('Fehler beim Abrufen des Tokens:', error);
    });

document.addEventListener('DOMContentLoaded', function() {
    var today = new Date();
    var dayOfWeek = today.getDay(); // 0 = Sonntag, 1 = Montag, ..., 6 = Samstag

    if (dayOfWeek === 0 || dayOfWeek === 3) { // 0 = Sonntag, 3 = Mittwoch
        document.getElementById('medikamenteBestellen').style.display = 'block';
    } else {
        document.getElementById('medikamenteBestellen').style.display = 'none';
    }
});

document.getElementById('aufgaben-Aufnahmedienst').addEventListener('click', function() {
    var panelBody = document.getElementById('aufgaben-Aufnahmedienst-panel-body');
    var panelIcon = document.getElementById('aufgaben-Aufnahmedienst-panel-icon');
    
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
