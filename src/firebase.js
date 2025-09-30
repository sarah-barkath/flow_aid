// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZAA9RfBsnNN-ma8L2-ixJTl-9K5-oBWE",
  authDomain: "flowaid.firebaseapp.com",
  projectId: "flowaid",
  storageBucket: "flowaid.appspot.com",
  messagingSenderId: "387485812595",
  appId: "1:387485812595:web:67cce76da2dbd7ced6e706"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
