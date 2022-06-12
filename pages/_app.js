import "../styles/globals.css";
import { auth, db, app } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../components/Loading";
import { AuthProvider } from "../contexts/AuthContext";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      // await
      //  setDoc(doc(collection(db, "users"), user.uid), {
      //   email: user.email,
      //   lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      //   photoURL: user.photoURL,
      // },
      // { merge: true });

      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
          displayName:user.displayName,
        },
        { merge: true }
      );
    }
  }, [user]);
  if (loading) return <Loading />;
  if (!user) return <Login />;
  return(
  <AuthProvider>
  <Head>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"/>
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
<meta name="msapplication-TileColor" content="#603cba"/>
<meta name="theme-color" content="#ffffff"/>
<meta
          name="description"
          content="Sergey Bolotnikov's Almost WhatsApp chat "
        />
  </Head>
    <Component {...pageProps} />;
  </AuthProvider>
  )
}

export default MyApp;
