import { logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('logout-button').addEventListener('click', logout);
});
