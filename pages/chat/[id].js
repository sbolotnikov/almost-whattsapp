import styled from 'styled-components';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useContext, useEffect, useState } from 'react';
import { CallContext } from '../../callContext';
import CallPanel from '../../components/CallPanel';

function Chat({ messages, chat }) {
  const [user] = useAuthState(auth);
  const [widthSrc, setWidth] = useState(window.innerWidth);
  const [visProfile, setVisProfile] = useState(false);
  // window.innerWidth
  const { newCall, setNewCall } =useContext(CallContext);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
  });
  return (
    <Container >
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
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      {newCall && (
        <CallPanel onClose={(a) => {setNewCall(a);}}
        />
      )}
      {widthSrc > 767 && (
        <Sidebar
          onCall={(e) => {
            setVisProfile(!visProfile);
          }}
        />
      )}
      <ChatContainer>
        <ChatScreen
          chat={chat}
          messages={messages}
          scrSmall={widthSrc > 767 ? false : true}
        />
      </ChatContainer>
      {widthSrc > 767 && visProfile && (
        <Profile
          onClose={(a) => {
            setVisProfile(false);
          }}
        />
      )}
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id);

  // PREP the messages on the server
  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
  // PREP chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
  position: relative;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge*/
  scrollbar-width: none; /*Firefox*/
`;
