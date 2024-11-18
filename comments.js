// Your web app's Firebase configuration
import { checkAuthentication, logout, database } from './auth.js';
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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
  mindmapContainer.innerHTML = "";
  const comments = snapshot.val();
  if (comments) {
    Object.keys(comments).forEach((key) => {
      displayComment(comments[key]);
    });
  }
});
