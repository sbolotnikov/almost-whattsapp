import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

  const firebaseConfig = {
    apiKey: process.env.CHAT_FIREBASE_APIKEY,
    authDomain: process.env.CHAT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.CHAT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.CHAT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.CHAT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.CHAT_FIREBASE_APP_ID
  };

  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
  
  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider }