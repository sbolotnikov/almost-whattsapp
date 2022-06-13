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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Sergey Bolotnikov's Almost WhatsApp chat "
        />
                <meta
          property="og:title"
          content="Sergey Bolotnikov's Almost WhatsApp chat "
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://almost-whattsapp.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://almost-whattsapp.vercel.app/images/logo.jpg"
        />
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
