// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCKfV5gfsjm-wNYOplwZZhJoInS8O4I4o",
  authDomain: "inventory-management-7c0f9.firebaseapp.com",
  projectId: "inventory-management-7c0f9",
  storageBucket: "inventory-management-7c0f9.appspot.com",
  messagingSenderId: "169776691991",
  appId: "1:169776691991:web:a8792fca95cbaf8de51552"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const uid = auth.currentUser?.uid;
export  {db,auth,app,uid};