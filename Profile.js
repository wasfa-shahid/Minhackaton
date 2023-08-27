import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js"; // Import initializeApp
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDmlL7LNlg4ZAYQhtEXyydjn3pNH8We-9U",
    authDomain: "blog-707f4.firebaseapp.com",
    projectId: "blog-707f4",
    storageBucket: "blog-707f4.appspot.com",
    messagingSenderId: "1068783077281",
    appId: "1:1068783077281:web:967a29d2f5ab88afbcade0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

var cachedUsername = localStorage.getItem('u.firstName'); // Replace with your actual cached username
var cachedUid = localStorage.getItem('u.id'); // Replace with your actual cached UID

// Get references to form elements
var usernameField = document.getElementById('username');
var currentPasswordField = document.getElementById('currentPassword');
var newPasswordField = document.getElementById('newPassword');
var confirmPasswordField = document.getElementById('confirmPassword');
var changePasswordButton = document.getElementById('changePasswordButton');

// Populate the username field with cached data
usernameField.value = cachedUsername;

changePasswordButton.addEventListener('click', function () {
  var currentPassword = currentPasswordField.value;
  var newPassword = newPasswordField.value;
  var confirmPassword = confirmPasswordField.value;

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    alert('New password and confirm password do not match.');
    return;
  }

  // Reauthenticate the user using their email and password
  var user = auth.currentUser;
  var credential = EmailAuthProvider.credential(cachedUid, currentPassword);

  reauthenticateWithCredential(user, credential)
    .then(function () {
      // User successfully reauthenticated, now update the password
      updatePassword(user, newPassword)
        .then(function () {
          alert('Password updated successfully.');
          // You can also clear the password fields if needed
          currentPasswordField.value = "";
          newPasswordField.value = "";
          confirmPasswordField.value = "";
        })
        .catch(function (error) {
          alert('Error updating password: ' + error.message);
        });
    })
    .catch(function (error) {
      alert('Error reauthenticating user: ' + error.message);
    });
});
