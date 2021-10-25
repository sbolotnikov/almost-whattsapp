import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar, Button, IconButton } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import { useRef, useState, useEffect } from "react";
import Cloudinary from "./Cloudinary";

function ChatScreen({ chat, messages, scrSmall }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endOfMessagesRef = useRef(null);
  const [input, setInput] = useState("");
  const [attached, setAttached] = useState({});
  const [vis, setVis] = useState(false);
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };
  useEffect(() => {
    // see indication of the attached file
    console.log(attached);
  }, [attached]);

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const uploadCloudinaryVisibility = () => {
    setVis(!vis);
  };
  function handleFileInput(t) {
    // update information of the test state
    setVis(!vis);
    let linkObj;
    setAttached(t);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    // Update Last seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  
  const exitChat = () => {
    router.push(`/`);
}
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3 style={{}}>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading last active....</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <ArrowBackIcon onClick={exitChat}/>
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {vis && <Cloudinary onChange={(t) => handleFileInput(t)} />}
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <InputArea value={input} onChange={(e) => setInput(e.target.value)} />
        <MicIcon />
          <AttachFileIcon onClick={uploadCloudinaryVisibility} />
        {input && (
            <PlayArrowIcon disabled={!input} type="submit" onClick={sendMessage} />
        )}
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const InputArea = styled.textarea`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 120;
  top: 0;
  display: flex;
  padding: 11px;
  height: 7vh;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  padding: 10px;
  background-color: #e5ded8;
  height: 79vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /*IE and Edge*/
  scrollbar-width: none; /* Firefox */
`;
const EndOfMessage = styled.div`
  margin-bottom: 6%;
`;
