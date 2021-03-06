import '../styles/globals.css';
import { auth, db, app } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import Loading from '../components/Loading';
import { AuthProvider } from '../contexts/AuthContext';
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Head from 'next/head';
import CallProvider from '../callContext';

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

      db.collection('users').doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
          displayName: user.displayName,
        },
        { merge: true }
      );
    }
  }, [user]);
  if (loading) return <Loading />;
  if (!user) return <Login />;
  return (
    <AuthProvider>
      <Head></Head>
      <CallProvider>
        <Component {...pageProps} />;
      </CallProvider>
    </AuthProvider>
  );
}

export default MyApp;
