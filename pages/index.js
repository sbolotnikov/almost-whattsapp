import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [visProfile, setVisProfile] = useState(false);
  return (
    <div>
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
      <Sidebar
        onCall={(e) => {
          setVisProfile(!visProfile);
        }}
      />
    </div>
  );
}
