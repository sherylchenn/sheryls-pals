// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf5Lb56uSk3_KDfCyMuVV_BFZr1GKu6Ug",
  authDomain: "personal-blog-7e211.firebaseapp.com",
  projectId: "personal-blog-7e211",
  storageBucket: "personal-blog-7e211.appspot.com",
  messagingSenderId: "857745385023",
  appId: "1:857745385023:web:054e7ce01a3def7a6bba8a",
  measurementId: "G-MHV9V0FFY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();