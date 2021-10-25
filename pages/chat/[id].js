import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail"
import { useCollection } from "react-firebase-hooks/firestore"
import {  useEffect, useState } from "react";

function Chat({messages, chat}) {
    const [user] = useAuthState(auth);
    const [widthSrc, setWidth] = useState(window.innerWidth);
    // window.innerWidth


 useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);  
}

    window.addEventListener('resize', handleResize);
})
  return (
    <Container>
      <Head>
        <tytle>Chat with {getRecipientEmail(chat.users, user)}</tytle>
      </Head>
      {widthSrc>767 && <Sidebar />}
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} scrSmall={widthSrc>767 ? false : true}/>
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  // PREP the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
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
