import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDJIr1Ck2bYBF5UgFQ1cZ_k0eXGX23Ful8",
  authDomain: "expense-tracker-2e52e.firebaseapp.com",
  projectId: "expense-tracker-2e52e",
  storageBucket: "expense-tracker-2e52e.appspot.com",
  messagingSenderId: "386496333081",
  appId: "1:386496333081:web:bb627b8a971f1f98d13188",
  measurementId: "G-EVHTDXV7LD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);