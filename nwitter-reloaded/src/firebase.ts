// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCAyxDcYQmFFcgJOdVojv1Xdc9Cl-Yn6o",
  authDomain: "nwitter-reloaded-59992.firebaseapp.com",
  projectId: "nwitter-reloaded-59992",
  storageBucket: "nwitter-reloaded-59992.firebasestorage.app",
  messagingSenderId: "620121942655",
  appId: "1:620121942655:web:80ebb771507fd8853fed4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);