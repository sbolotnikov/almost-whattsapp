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
        
      <link rel="icon" href="/favicon.ico" />
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
