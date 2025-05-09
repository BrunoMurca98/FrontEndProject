import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuRu24E_4gd7Oywcx7F0eHGIwT-bQD-G0",
  authDomain: "backend-82aa8.firebaseapp.com",
  projectId: "backend-82aa8",
  storageBucket: "backend-82aa8.firebasestorage.app",
  messagingSenderId: "653638494688",
  appId: "1:653638494688:web:955b282426a326193e2385"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);