import { signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Logout-Funktion
function logout() {
  signOut(auth)  // auth ist die Firebase-Authentifizierungskonfiguration
    .then(() => {
      // Erfolgreich abgemeldet
      console.log('Benutzer erfolgreich abgemeldet.');
      // Weiterleitung zur Login-Seite oder zur gewünschten Seite
      window.location.href = 'login.html';  // oder die gewünschte Seite nach dem Logout
    })
    .catch((error) => {
      // Fehler beim Abmelden
      console.error('Fehler beim Abmelden: ', error);
    });
}
