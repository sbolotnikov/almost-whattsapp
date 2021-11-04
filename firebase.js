// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC5VrkrvUr2zl3sVnOhqk9ywsRya60HcFQ",
  authDomain: "almost-whattsup.firebaseapp.com",
  projectId: "almost-whattsup",
  storageBucket: "almost-whattsup.appspot.com",
  messagingSenderId: "946261875744",
  appId: "1:946261875744:web:d410a9319fe1bf7703f045"
  // apiKey: process.env.CHAT_FIREBASE_APIKEY,
  // authDomain:  process.env.CHAT_FIREBASE_AUTH_DOMAIN,
  // projectId:  process.env.CHAT_FIREBASE_PROJECT_ID,
  // storageBucket:  process.env.CHAT_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: "946261875744",
  // appId: "1:946261875744:web:d410a9319fe1bf7703f045"
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}
export { db, auth, signInWithGoogle };
