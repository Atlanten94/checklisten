import { checkAuthentication, logout, database, ref, set, get } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Authentifizierung prüfen
    checkAuthentication();

    // Beispiel: Daten aus der Datenbank laden
    const dataRef = ref(database, 'pflegeformularFrüh/progress');
    get(dataRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Daten geladen:', snapshot.val());
            } else {
                console.log('Keine Daten gefunden.');
            }
        })
        .catch((error) => {
            console.error('Fehler beim Laden der Daten:', error);
        });

    // Logout-Button
    document.getElementById('logoutBtn').addEventListener('click', logout);
});
