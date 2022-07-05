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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import { useRef, useState, useEffect, useContext } from "react";
import Cloudinary from "./Cloudinary";
import MicRecord from "./MicRecord";
import EmojiShow from "./EmojiShow";
import GetChatOptions from "./GetChatOptions";
import { v1 as uuid } from "uuid";
import { CallContext } from "../callContext";
function ChatScreen({ chat, messages, scrSmall }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endOfMessagesRef = useRef(null);
  const [input, setInput] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [attached, setAttached] = useState({ url: "", type: "" });
  const [vis, setVis] = useState(false);
  const [voiceRecVis, setVoiceRecVis] = useState(false);
  const [visEmoji, setVisEmoji] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visChatSet, setVisChatSet] = useState(false);
  const [chatName, setChatName] = useState("");
  const { setAudioOnly} = useContext(CallContext);

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

  const emojiVisibility = () => {
    setVisEmoji(!visEmoji);
  };

  function handleEmojiInput(t) {
    setInput(input + t);
  }
 
  function handleFileInput(t) {
    setVis(!vis);
    setAttached(t);
  }
  function handleEmojiInput(t) {
    setInput(input+t);
  }
  useEffect(() => {
    if (loading) {
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
        filetype: attached.type,
        url: attached.url,
      });
  
      setInput("");
      setAttached({ url: "", type: "" });
      scrollToBottom();
      setLoading(false);
      
    }
}, [loading])
  function handleVoiceRecording(t){
    setVoiceRecVis(!voiceRecVis);
    setAttached(t);
    setLoading(true);
  }
  const sendMessage = (e) => {
    e.preventDefault();
    setLoading(true);

  };
  function getChatName() {
    db
    .collection("chats")
    .doc(router.query.id)
    .get()
    .then((chat) => {
      console.log(chat.data())

      var chatTitle=(chat.data().header.length>0)?chat.data().header:recipient?.displayName

     setChatName(chatTitle);
     chat.data().participants>2 ? setIsGroup(true):setIsGroup(false);
    }).catch((error) => {
      console.error(error);
      setChatName('');
    });
  };

  getChatName();
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  console.log(recipient);
  const recipientEmail = getRecipientEmail(chat.users, user);

  const exitChat = () => {
    router.push(`/`);
  };
  const makeCall = (e, a) => {
    e.preventDefault();
    const id = uuid();
    // set context value depending on video or audio call
    setAudioOnly(a)
    setAttached({ url: `/room/${id}`, type: "link" });
    setLoading(true);
    router.push(`/room/${id}`);
  };
  return (
    <Container>
    {visChatSet && <GetChatOptions chat={router.query.id} onClose={(a)=>{setVisChatSet(!visChatSet)}}/>}
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderRightSide>
        <HeaderInformation>
          <h3 >{chatName }</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
              {/* <ArrowBackIcon /> */}
            </p>
          ) : (
            <p>Loading last active....</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
            <IconButton onClick={(e)=>makeCall(e,false)}>
              <VideoCallIcon />
            </IconButton>
            <IconButton onClick={(e)=>makeCall(e,true)}>
              <CallIcon />
            </IconButton>  
          <IconButton onClick={()=>{setVisChatSet(!visChatSet)}}>
            <MoreVertIcon />
          </IconButton>
          {scrSmall && (
            <IconButton onClick={exitChat}>
              <ArrowBackIcon />
            </IconButton>
          )}
        </HeaderIcons>
        </HeaderRightSide>
      </Header>

      <MessageContainer>
        {vis && <Cloudinary onChange={(t) => handleFileInput(t)} />}
        
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>
      {visEmoji && 
      <EmojiShow onChange={(t) => handleEmojiInput(t)} />
       }
      {voiceRecVis && <MicRecord onChange={(t) => handleVoiceRecording(t)}/>} 
      <InputContainer>
        <InsertEmoticonIcon onClick={emojiVisibility} />
        <InputArea value={input} onChange={(e) => setInput(e.target.value)} />
        <MicIcon onClick={()=>{setVoiceRecVis(!voiceRecVis)}}/>
        <AttachFileIcon onClick={uploadCloudinaryVisibility} />
        {(input || attached.url) && (
          <PlayArrowIcon
            disabled={!input}
            type="submit"
            onClick={sendMessage}
          />
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
  z-index: 120;
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
const HeaderRightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%;
  /* @media (max-width: 768px) {
    flex-direction: column;
  } */
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  margin-top: 10px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: start;
  > h3 {
    width: 100%;
    margin:0;
  }
  > p {
    font-size: 1em;
    margin:0;
    color: gray;
  }
`;

const HeaderIcons = styled.div`
   width:30%;
   display: flex;
   flex-wrap: wrap;
   justify-content: end;
   > button {
     padding:.15em;
   }
`;
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
