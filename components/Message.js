import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { IconButton } from "@material-ui/core";
import moment from "moment";
import { CallContext } from "../callContext";
import { useContext } from "react";
import { useRouter } from "next/router";

function Message({ user, message }) {
  const { setAudioOnly} = useContext(CallContext);
  const router = useRouter();
  const isToday = (millisecs) => {
    const today = new Date();
    const someDate = new Date(millisecs);
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };
  const joinCall = (e,a) => {
    e.preventDefault();
    // set context value depending on video or audio call
    setAudioOnly(a)
    router.push(message.url);
  };
  const showFile = () => {
    if (message.filetype === "img")
      return <img loading="lazy" src={message.url} alt="" width="80%" />;
    if (message.filetype === "video")
      return (
        <video preload="none" width="80%" hight="auto" controls>
          <source src={message.url} />
          Your browser does not support the video tag.
        </video>
      );
    if (message.filetype === "audio")
      return (
        <audio controls >
          <source src={message.url} />
          Your browser does not support the audio element.
        </audio>
      );
      if (message.filetype === "link")
      return (
        <div>

<IconButton onClick={(e)=>joinCall(e,false)}>
              <VideoCallIcon />
            </IconButton>
            <IconButton onClick={(e)=>joinCall(e,true)}>
              <CallIcon />
            </IconButton>
        <h5>Join the call</h5>
        </div>
      );
    // case "audio":
  };
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  return (
    <Container>
      <TypeOfMessage>
        {showFile()}
        <p>{message.message}</p>
        <Timestamp>
          {message.timestamp
            ? isToday(message.timestamp)
              ? "Today  " + moment(message.timestamp).format("LT")
              : moment(message.timestamp).format("LLL")
            : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;
const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
