// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCHSuzBMZTAk6z839Ocws4uECDCrU2qjY",
  authDomain: "wandernest-f197f.firebaseapp.com",
  projectId: "wandernest-f197f",
  storageBucket: "wandernest-f197f.firebasestorage.app",
  messagingSenderId: "437352622650",
  appId: "1:437352622650:web:e6b39786e402164f776303"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
