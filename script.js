// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpAyWWpfUb9Xm00pjVqRfC_BItIyp2qpQ",
    authDomain: "stockdash1-version.firebaseapp.com",
    databaseURL: "https://stockdash1-version-default-rtdb.firebaseio.com",
    projectId: "stockdash1-version",
    storageBucket: "stockdash1-version.appspot.com",
    messagingSenderId: "541032913907",
    appId: "1:541032913907:web:be6d790e48cf808d36d086",
    measurementId: "G-7JR4Y7FD8N"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get references to Firestore database and Storage
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Get the form and add a submit event listener
const articleForm = document.getElementById('articleForm');

articleForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get the values from the form
    const title = document.getElementById('articleTitle').value;
    const content = document.getElementById('articleContent').value;
    const pdfLink = document.getElementById('pdfLink').value; // Retrieve PDF link

    try {
        // Call a function to add the article to Firestore, including the PDF link
        addArticleToFirestore(title, content, pdfLink);
    } catch (error) {
        console.error("Error adding article: ", error);
        // Handle errors or show an error message
    }
});

// Function to add an article to Firestore
async function addArticleToFirestore(title, content, pdfLink) {
    try {
        // Add the article to the 'articles' collection in Firestore
        const docRef = await addDoc(collection(db, 'articles'), {
            title: title,
            content: content,
            attachmentUrl: pdfLink, // Include the PDF link
            timestamp: serverTimestamp()
        });

        console.log("Article added with ID: ", docRef.id);

    } catch (error) {
        console.error("Error adding article: ", error);
        // Handle errors or show an error message
    }
}
