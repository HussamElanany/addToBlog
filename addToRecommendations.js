// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Get a reference to the Firestore database
const db = getFirestore(firebaseApp);

// Function to add data to elements
function updateElementsWithData(companyTitle, reason) {
    const companyTitleElement = document.querySelector('.companyTitle');
    const reasonElement = document.querySelector('.reason');

    if (companyTitleElement && reasonElement) {
        companyTitleElement.textContent = companyTitle;
        reasonElement.textContent = reason;
    } else {
        console.error("Elements not found.");
    }
}

// Add data to Firestore and update elements
async function addDataToFirestoreAndElements(data) {
    try {
        // Add data to Firestore
        const docRef = await addDoc(collection(db, 'recomendationReason'), {
            companyTitle: data.companyTitle,
            reason: data.reason,
            timestamp: serverTimestamp()
        });

        alert("Data added with ID: ", docRef.id);

        // Update elements with the added data
        updateElementsWithData(data.companyTitle, data.reason);
    } catch (error) {
        console.error("Error adding data: ", error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Get references to elements
    const companyTitleInput = document.getElementById('companyTitleInput');
    const reasonInput = document.getElementById('reasonInput');
    const addDataBtn = document.getElementById('addDataBtn');

    // Event listener for the button
    addDataBtn.addEventListener('click', function () {
        const inputCompanyTitle = companyTitleInput.value;
        const inputReason = reasonInput.value;

        // Check if both inputs are not empty
        if (inputCompanyTitle && inputReason) {
            const inputData = {
                companyTitle: inputCompanyTitle,
                reason: inputReason
            };

            // Call the function with the input data
            addDataToFirestoreAndElements(inputData);
        } else {
            alert('Please fill in both company title and reason.');
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {


    // Event listener for market status button
    const addDataBtnStatus = document.getElementById('addDataBtnStatus');
    addDataBtnStatus.addEventListener('click', function () {
        const linkImgStatus = document.getElementById('linkImgStatus').value;
        const indexStatus = document.getElementById('index').value;
        const marketStatus = document.getElementById('marketStauts').value;

        if (linkImgStatus && indexStatus && marketStatus) {
            const dataStatus = {
                linkImg: linkImgStatus,
                index: indexStatus,
                marketStatus: marketStatus,
                timestamp: serverTimestamp(),
            };

            addDataToFirestore(dataStatus, 'marketStatus'); // Specify collection name
        } else {
            alert('Please fill in all fields for market status.');
        }
    });

    // Event listener for explanation button
    const addDataBtnExplanation = document.getElementById('addDataBtnExplanation');
    addDataBtnExplanation.addEventListener('click', function () {
        const linkImgExplanation = document.getElementById('linkImgExplanation').value;
        const example = document.getElementById('example').value;
        const explanation = document.getElementById('explanation').value;

        if (linkImgExplanation && example && explanation) {
            const dataExplanation = {
                linkImg: linkImgExplanation,
                example: example,
                explanation: explanation,
                timestamp: serverTimestamp(),
            };

            addDataToFirestore(dataExplanation, 'explanation'); // Specify collection name
        } else {
            alert('Please fill in all fields for explanation.');
        }
    });

    // Function to add data to Firestore
    async function addDataToFirestore(data, collectionName) {
        try {
            // Add data to Firestore
            const docRef = await addDoc(collection(db, collectionName), data);

            alert('Data added with ID: ' + docRef.id);

            // You can add additional logic or UI updates here
        } catch (error) {
            console.error('Error adding data: ', error);
        }
    }
});




// Get the form and add a submit event listener
const recommendationForm = document.getElementById('recommendationForm');

recommendationForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get the values from the form
    const priceTargetFar = document.getElementById('priceTargetFar').value;
    const priceTargetMedium = document.getElementById('priceTargetMedium').value;
    const priceTargetNear = document.getElementById('priceTargetNear').value;
    const entryPrice = document.getElementById('entryPrice').value;
    const stopLoss = document.getElementById('stopLoss').value;
    const date = document.getElementById('date').value;
    const companyCode = document.getElementById('companyCode').value;
    const companyName = document.getElementById('companyName').value;
    const recommendationStatus = document.getElementById('recommendationStatus').value;

    try {
        // Add the recommendation to the 'recommendations' collection in Firestore
        const docRef = await addDoc(collection(db, 'recommendations'), {
            priceTargetFar: priceTargetFar,
            priceTargetMedium: priceTargetMedium,
            priceTargetNear: priceTargetNear,
            entryPrice: entryPrice,
            stopLoss: stopLoss,
            date: date,
            companyCode: companyCode,
            companyName: companyName,
            recommendationStatus: recommendationStatus,
            timestamp: date
        });

        alert("Recommendation added with ID: ", docRef.id);
        // Optionally, redirect to the recommendations page or show a success message

    } catch (error) {
        alert("Error adding recommendation: ", error);
        console.log("Error adding recommendation: ", error);
        // Handle errors or show an error message
    }
});
