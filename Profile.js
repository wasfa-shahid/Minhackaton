import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
    import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
document.addEventListener('DOMContentLoaded', function () {

    
    
    
    
      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyDmlL7LNlg4ZAYQhtEXyydjn3pNH8We-9U",
        authDomain: "blog-707f4.firebaseapp.com",
        projectId: "blog-707f4",
        storageBucket: "blog-707f4.appspot.com",
        messagingSenderId: "1068783077281",
        appId: "1:1068783077281:web:967a29d2f5ab88afbcade0"
      };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    // Get a reference to the Firebase Realtime Database
    const database = getDatabase(app);

    // Simulate caching username and uid
    var cachedUsername = localStorage.getItem('u.firstName') // Replace with your actual cached username
    var cachedUid = localStorage.getItem('u.id') // Replace with your actual cached UID

    // Get references to form elements
    var usernameField = document.getElementById('username');
    var currentPasswordField = document.getElementById('currentPassword');
    var newPasswordField = document.getElementById('newPassword');
    var confirmPasswordField = document.getElementById('confirmPassword');
    var changePasswordButton = document.getElementById('changePasswordButton');

    // Populate the username field with cached data
    usernameField.value = cachedUsername;

    // Handle button click
    changePasswordButton.addEventListener('click', function () {
        var currentPassword = currentPasswordField.value;
        var newPassword = newPasswordField.value;
        var confirmPassword = confirmPasswordField.value;

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }

        // Here, you would typically send a request to your server to handle database operations securely,
        // but for this example, we'll simulate it with a console log.
        console.log("Simulating password change for UID: " + cachedUid);
        console.log("Current Password: " + currentPassword);
        console.log("New Password: " + newPassword);

        // You can then use Firebase SDK to update the password securely.
        // firebase.auth().currentUser.updatePassword(newPassword).then(function() {
        //     alert('Password updated successfully.');
        // }).catch(function(error) {
        //     alert('Error updating password: ' + error.message);
        // });
    });
});
