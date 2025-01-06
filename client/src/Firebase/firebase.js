// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx0z9m08TD4KU_fcJJuTI1CFKRd7onC78",
  authDomain: "codeshare-5087e.firebaseapp.com",
  projectId: "codeshare-5087e",
  storageBucket: "codeshare-5087e.firebasestorage.app",
  messagingSenderId: "633317873182",
  appId: "1:633317873182:web:7502564af96b215c24800f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
