import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // <-- This is the missing import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBkiXhoR2j_UlMaTZ2haS0A5o1LUHenIl0',
  authDomain: 'sitedatabase-79354.firebaseapp.com',
  projectId: 'sitedatabase-79354',
  storageBucket: 'sitedatabase-79354.firebasestorage.app',
  messagingSenderId: '405146826157',
  appId: '1:405146826157:web:84cc9403a39ce43ea81d24',
  measurementId: 'G-T5T3S17YF4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };