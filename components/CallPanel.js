import { useContext, useEffect } from 'react';
import { CallContext } from '../callContext';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@material-ui/core';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { useRouter } from 'next/router';
function CallPanel({onClose}) {
  const { setAudioOnly, room, callerNameImg, groupCall, callerName } =
    useContext(CallContext);
  const router = useRouter();
  const makeCall = (e, a) => {
    e.preventDefault();
    // set context value depending on video or audio call
    setAudioOnly(a);
    router.push(room);
  };
  useEffect(() => {
      let secondsLeft=60;
    let timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft === 0) {
          clearInterval(timerInterval);
          onClose(false);
        }
      }, 1000);
  },[])
  return (
    <Container>
    <audio autoplay="autoplay" loop="loop" >
  <source src="./marimba-ringtone.wav" type="audio/wav"/>
  <source src="./marimba-ringtone.mp3" type="audio/mpeg"/>
</audio>
      <InputContainer>
        <HeaderTitle>Call from {groupCall ? ' group' : ''}</HeaderTitle>
        <CallerTitle>{callerName}</CallerTitle>
        {callerNameImg.length > 1 ? (
          <img
            src={callerNameImg}
            alt=""
            style={{ marginBottom: 10 }}
            height={200}
          />
        ) : (
          <UserAvatar>{callerNameImg}</UserAvatar>
        )}

        <GreenButton onClick={(e) => makeCall(e, false)} style={{backgroundColor:'green'}}>
          <VideoCallIcon style={{marginRight: 10}} />Answer with Video
        </GreenButton>
        <GreenButton onClick={(e) => makeCall(e, true)} style={{backgroundColor:'green'}}>
          <CallIcon style={{marginRight: 10}}/> Answer Audio Only
        </GreenButton>
        <GreenButton onClick={(e)=>onClose(false)} style={{backgroundColor:'red'}}>
          <DoDisturbOnIcon style={{marginRight: 10}}/>Do not Disturb
        </GreenButton>
      </InputContainer>
    </Container>
  );
}

export default CallPanel;
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(4px);
  z-index: 200;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 95%;
  width: 95%;
  max-width: 350px;
  background-color: white;
  border-radius: 5px;
  object-fit: contain;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const HeaderTitle = styled.h4`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 2;
  letter-spacing: 0.02857em;
`;
const CallerTitle = styled.h4`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  width: 100%;
  padding: 10px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 2;
  letter-spacing: 0.02857em;
`;
const UserAvatar = styled(Avatar)`
  height: 200px;
  width: 200px;
`;
const GreenButton = styled.button`
  display:flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  text-transform: uppercase;
  color: white;
  padding:10px 0;
  margin:5px 0;

`;
