/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import firebase from "firebase/compat/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC-SgYXRen2X1BsK25kro7WRvJdTXWVoGs",
  authDomain: "simple-notes-firebase-4a6bb.firebaseapp.com",
  projectId: "simple-notes-firebase-4a6bb",
  storageBucket: "simple-notes-firebase-4a6bb.firebasestorage.app",
  messagingSenderId: "461755030517",
  appId: "1:461755030517:web:e120bee64c9b42e5069ebc",
  measurementId: "G-QVHSEBJTL3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default firebase