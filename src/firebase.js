// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5RcL2uwid3-seeVrKCfyTFT_WONH5N44",
  authDomain: "to-do-65c30.firebaseapp.com",
  projectId: "to-do-65c30",
  storageBucket: "to-do-65c30.firebasestorage.app",
  messagingSenderId: "474527784167",
  appId: "1:474527784167:web:9540c3e374449791e0d642",
  measurementId: "G-1W87V5V7DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);