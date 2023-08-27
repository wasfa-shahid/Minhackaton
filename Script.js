import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";



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

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeat-password").value;

        // Simple validation
        if (!firstName || !lastName || !email || !password || !repeatPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== repeatPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Call the signUp function to save the data to the database
        signUp(firstName, lastName, email, password);
        form.reset();
    });

    // Function to handle sign-up and save data to the database
    function signUp(firstName, lastName, email, password) {
        // Create a reference to a new node in the database using push (generates a unique key)
        const usersRef = push(ref(database, 'users'));

        // Define the data you want to save
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            // You might want to hash or encrypt the password before saving it
            // for security reasons in a production environment.
            password: password
        };

        // Set the data in the unique user node
        set(usersRef, userData)
            .then(() => {
                console.log('Data saved successfully!');
                // You can redirect or perform other actions here
            })
            .catch((error) => {
                console.error('Error saving data: ', error);
            });
    }
});
