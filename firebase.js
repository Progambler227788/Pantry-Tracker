// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics, isSupported } from "firebase/analytics"; // Uncomment if you need Analytics

let app;
let firestore;

if (typeof window !== 'undefined') {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBjRSKg7adbZfhrE9--ZAkCsayBWzPHbg0",
    authDomain: "inventory-tracker-6042d.firebaseapp.com",
    projectId: "inventory-tracker-6042d",
    storageBucket: "inventory-tracker-6042d.appspot.com",
    messagingSenderId: "385357945730",
    appId: "1:385357945730:web:f4aa61cc50058a86228d9b",
    measurementId: "G-RJVTFVQD56"
  };

  // Initialize Firebase
  if (!app) {
    app = initializeApp(firebaseConfig);
  }

  firestore = getFirestore(app);

  // Uncomment if you need Analytics
  // if (isSupported()) {
  //   getAnalytics(app);
  // }
}

export { firestore };
