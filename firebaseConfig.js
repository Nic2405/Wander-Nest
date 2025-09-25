import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDCHSuzBMZTAk6z839Ocws4uECDCrU2qjY",
  authDomain: "wandernest-f197f.firebaseapp.com",
  projectId: "wandernest-f197f",
  storageBucket: "wandernest-f197f.firebasestorage.app",
  messagingSenderId: "437352622650",
  appId: "1:437352622650:web:e6b39786e402164f776303"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
