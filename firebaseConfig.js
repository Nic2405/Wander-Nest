import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDCHSuzBMZTAk6z839Ocws4uECDCrU2qjY',
  authDomain: 'wandernest-f197f.firebaseapp.com',
  projectId: 'wandernest-f197f',
  storageBucket: 'wandernest-f197f.appspot.com',
  messagingSenderId: '437352622650',
  appId: '1:437352622650:web:e6b39786e402164f776303',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
