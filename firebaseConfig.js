import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnQB9HV0uMwMOpe84wq0cqpC5f2lVQlmo",
  authDomain: "artiliceo.firebaseapp.com",
  projectId: "artiliceo",
  storageBucket: "artiliceo.appspot.com",
  messagingSenderId: "921514159707",
  appId: "1:921514159707:web:bf5d4ffe3f7e56e13b997e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);