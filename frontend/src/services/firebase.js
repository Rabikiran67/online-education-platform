// Import necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore SDK
import { getStorage } from "firebase/storage"; // Firebase Storage SDK

// Your Firebase config object (make sure to keep this private and secure)
const firebaseConfig = {
  apiKey: "AIzaSyAZ669tDTeo1VO53Zh_mT-kusEsTg58mmU",
  authDomain: "course-select-2d888.firebaseapp.com",
  projectId: "course-select-2d888",
  storageBucket: "course-select-2d888.firebasestorage.app",
  messagingSenderId: "437437540987",
  appId: "1:437437540987:web:b8bb5ec81fc411e2e710de",
  measurementId: "G-JFFTTSV7F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth, Firestore, and Storage
const auth = getAuth(app); // Firebase authentication
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app); // Firebase Storage instance

// Set up Google and Facebook providers for social login
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export the necessary services and providers
export { auth, db, storage, googleProvider, facebookProvider };
