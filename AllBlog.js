import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmlL7LNlg4ZAYQhtEXyydjn3pNH8We-9U",
    authDomain: "blog-707f4.firebaseapp.com",
    projectId: "blog-707f4",
    storageBucket: "blog-707f4.appspot.com",
    messagingSenderId: "1068783077281",
    appId: "1:1068783077281:web:967a29d2f5ab88afbcade0"
  };

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);





function fetchAndDisplayContent() {
    const contentDiv = document.querySelector('#contentDiv');

    // Reference to the Firebase database
    const contentRef = ref(database, 'content');

    // Listen for changes in the 'content' node
    onValue(contentRef, (snapshot) => {
        contentDiv.innerHTML = ''; // Clear the existing content

        // Loop through each child in the 'content' node
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();

            // Create elements to display the content
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry'); // Add the main CSS class
            const titleHeading = document.createElement('h2');
            titleHeading.classList.add('entry-title'); // Add a CSS class to the title
            const timeParagraph = document.createElement('p');
            timeParagraph.classList.add('entry-time'); // Add a CSS class to the time
            const contentParagraph = document.createElement('p');
            contentParagraph.classList.add('entry-content'); // Add a CSS class to the content
            const usernameParagraph = document.createElement('p');
            usernameParagraph.classList.add('entry-username'); // Add a CSS class to the username

            // Set the text content for the elements
            titleHeading.textContent = data.title;
            const postDate = new Date(data.timestamp).toLocaleString();
            timeParagraph.textContent = `Posted on: ${postDate}`;
            contentParagraph.textContent = data.content;
            usernameParagraph.textContent = `Username: ${data.username}`; // Display the username

            // Append elements to the entryDiv
            entryDiv.appendChild(titleHeading);
            entryDiv.appendChild(timeParagraph);
            entryDiv.appendChild(contentParagraph);
            entryDiv.appendChild(usernameParagraph); // Append the username

            // Append the entryDiv to the contentDiv
            contentDiv.appendChild(entryDiv);
        });
    });
}


// Call the fetchAndDisplayContent function to initially load content
fetchAndDisplayContent();