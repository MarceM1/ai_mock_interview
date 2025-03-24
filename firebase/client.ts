import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBed6WwhKZQPmnr7h5r17x_uJMlD7x6z3I",
  authDomain: "ia-mock-interviews.firebaseapp.com",
  projectId: "ia-mock-interviews",
  storageBucket: "ia-mock-interviews.firebasestorage.app",
  messagingSenderId: "927972028971",
  appId: "1:927972028971:web:0f33c6527329d66688706e",
  measurementId: "G-D4MMSKEK7Y",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
