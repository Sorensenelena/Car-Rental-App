// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-9zG_83toTXdRqlPD7HoJ594Gz0LNSOo",
  authDomain: "car-rental-app-490db.firebaseapp.com",
  projectId: "car-rental-app-490db",
  storageBucket: "car-rental-app-490db.firebasestorage.app",
  messagingSenderId: "497870403342",
  appId: "1:497870403342:web:566e7df3aa0a62c4d3095f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

