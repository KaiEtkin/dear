// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc6d7QGuAFSqaSHkOH4cVshzFOCI_P0mY",
  authDomain: "dear-d1143.firebaseapp.com",
  projectId: "dear-d1143",
  storageBucket: "dear-d1143.appspot.com",
  messagingSenderId: "586597709356",
  appId: "1:586597709356:web:e1413eb1d257d9c8634389"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app,"dear-d1143.appspot.com");