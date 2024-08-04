// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export {firestore}