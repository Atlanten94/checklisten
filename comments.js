// Your web app's Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Verwende deine bestehende Firebase-Konfiguration
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

const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const mindmapContainer = document.getElementById('mindmapContainer');

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const comment = commentInput.value;
  if (comment.trim() !== "") {
    push(ref(database, 'comments'), { text: comment });
    commentInput.value = "";
  }
});

const colors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#D3A4FF", "#FFCCE5", "#CCE5FF"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function displayComment(commentData) {
  const commentNode = document.createElement('div');
  commentNode.className = 'comment-node';
  commentNode.innerText = commentData.text;
  commentNode.style.backgroundColor = getRandomColor(); // Zufällige Farbe zuweisen
  mindmapContainer.appendChild(commentNode);
}

onValue(ref(database, 'comments'), (snapshot) => {
  mindmapContainer.innerHTML = '';
  snapshot.forEach((childSnapshot) => {
    const commentData = childSnapshot.val();
    displayComment(commentData);
  });
});
