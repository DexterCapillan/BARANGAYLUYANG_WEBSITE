import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7xjrYiwB3o-IfINj4EQw1mi8DVRxDNfA",
  authDomain: "barangayluyang-system.firebaseapp.com",
  projectId: "barangayluyang-system",
  storageBucket: "barangayluyang-system.firebasestorage.app",
  messagingSenderId: "873722316838",
  appId: "1:873722316838:web:ff0ac03305e0faf3227ee7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);