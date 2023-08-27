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

// Function to save data to Firebase
function saveData() {
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;

    // Check if title and content meet the required length criteria
    if (title.length < 5) {
        alert('Title must be at least 5 characters long.');
        return; // Prevent form submission
    }

    if (content.length < 100) {
        alert('Content must be at least 100 characters long.');
        return; // Prevent form submission
    }

    // Get the current timestamp
    const timestamp = new Date().getTime();

    // Reference to the Firebase database
    const dataRef = ref(database, 'content/' + timestamp);

    // Retrieve the user's ID from localStorage
    const uId = localStorage.getItem('u.id'); // Replace 'yourCacheKey' with the actual cache key
    const uname = localStorage.getItem('u.firstName');
    if (!uId) {
        alert('User ID not found in localStorage. Please log in.'); // Handle the case where the user ID is not found.
        return; // Prevent data submission
    }

    // Create a new entry in the 'content' node with the timestamp as the key
    set(dataRef, {
        title: title,
        content: content,
        timestamp: timestamp,
        userId: uId, // Include the user's ID in the data
        username:uname
    });

    // Clear the input fields after saving
    document.querySelector('#title').value = '';
    document.querySelector('#content').value = '';

    alert('Blog Added Successfully!');
}



// Attach the saveData function to the button's click event
document.querySelector('#submit').addEventListener('click', saveData);

// Function to fetch and display content from Firebase
function fetchAndDisplayContent(userId) {
    const contentDiv = document.querySelector('#contentDiv');

    // Reference to the Firebase database
    const contentRef = ref(database, 'content');

    // Listen for changes in the 'content' node
    onValue(contentRef, (snapshot) => {
        contentDiv.innerHTML = ''; // Clear the existing content

        // Loop through each child in the 'content' node
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();

            // Check if the data belongs to the user with the specified ID
            if (data.userId === userId) {
                // Create elements to display the content
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry'); // Add the main CSS class
                const titleHeading = document.createElement('h2');
                titleHeading.classList.add('entry-title'); // Add a CSS class to the title
                const timeParagraph = document.createElement('p');
                timeParagraph.classList.add('entry-time'); // Add a CSS class to the time
                const contentParagraph = document.createElement('p');
                contentParagraph.classList.add('entry-content'); // Add a CSS class to the content

                // Set the text content for the elements
                titleHeading.textContent = data.title;
                const postDate = new Date(data.timestamp).toLocaleString();
                timeParagraph.textContent = `Posted on: ${postDate}`;
                contentParagraph.textContent = data.content;

                // Append elements to the entryDiv
                entryDiv.appendChild(titleHeading);
                entryDiv.appendChild(timeParagraph);
                entryDiv.appendChild(contentParagraph);

                // Append the entryDiv to the contentDiv
                contentDiv.appendChild(entryDiv);
            }
        });
    });
}

// You can get the user ID from your cache and then call the function with it
const userIdFromCache = localStorage.getItem('u.id')// Replace this with your actual method to get the user ID from cache
fetchAndDisplayContent(userIdFromCache);



