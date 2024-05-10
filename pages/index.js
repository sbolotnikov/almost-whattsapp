import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import { useContext, useState } from 'react';
import Image from 'next/image';
import CallPanel from '../components/CallPanel';
import { CallContext } from '../callContext';

export default function Home() {
  const [visProfile, setVisProfile] = useState(false);
  const { newCall, setNewCall } =useContext(CallContext);
  return (
    <div style={{position: 'relative'}}>
      <Head>
       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        <title>Almost WhattsApp</title>
      </Head>
      {visProfile && (
        <Profile
          onClose={(a) => {
            setVisProfile(false);
          }}
        />
      )}
      {newCall && (
        <CallPanel onClose={(a) => {setNewCall(a);}}
        />
      )}
      <Sidebar
        onCall={(e) => {
          setVisProfile(!visProfile);
        }}
      />
    </div>
  );
}
