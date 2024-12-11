import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBnQB9HV0uMwMOpe84wq0cqpC5f2lVQlmo",
  authDomain: "artiliceo.firebaseapp.com",
  projectId: "artiliceo",
  storageBucket: "artiliceo.appspot.com",
  messagingSenderId: "921514159707",
  appId: "1:921514159707:web:bf5d4ffe3f7e56e13b997e"
};

// Initialize Firebase
export
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);