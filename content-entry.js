import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Get a reference to the Firestore database
const db = getFirestore(firebaseApp);

document.getElementById('submit-button').addEventListener('click', async function () {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Sanitize content before storing
    const sanitizedContent = DOMPurify.sanitize(content);

    try {
        // Add the sanitized content to the 'explanation' collection in Firestore
        const docRef = await addDoc(collection(db, 'explanation'), {
            title: title,
            explanation: sanitizedContent
        });

        console.log('Content added with ID: ', docRef.id);
        alert('Content submitted successfully!');
    } catch (e) {
        console.error('Error adding document: ', e);
        alert('Error submitting content. Please try again.');
    }
});
