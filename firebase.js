import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
  apiKey: process.env.CHAT_FIREBASE_APIKEY,
  apiKey: "AIzaSyC5VrkrvUr2zl3sVnOhqk9ywsRya60HcFQ",
  authDomain: "almost-whattsup.firebaseapp.com",
  projectId: "almost-whattsup",
  storageBucket: "almost-whattsup.appspot.com",
  messagingSenderId: "946261875744",
  appId: "1:946261875744:web:d410a9319fe1bf7703f045"
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
