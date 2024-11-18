import { logout } from './auth.js';

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
