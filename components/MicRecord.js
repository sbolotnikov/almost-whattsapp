import { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function MicRecord(props) {
  // handles cloudinary upload and providing the link for a parent component
  const [isBlocked, setIsBlocked] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL]= useState('');
  const [blobFile, setBlob] = useState();
  

  const startRecord = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setIsRecording(true);
        }).catch((e) => console.error(e));
    }
  };

  const stopRecord = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlob(blob);
        setIsRecording(false);
        setBlobURL(blobURL);
      }).catch((e) => console.log(e));
  };
  const deleteRecord = () => {
    setIsRecording(false);
    setBlobURL('');
    setIsBlocked(false);
    setBlobURL();
  };
  useEffect(() => {
    navigator.getUserMedia({ audio: true },
        () => {
          console.log('Permission Granted');
          setIsBlocked(false);
        },
        () => {
          console.log('Permission Denied');
          setIsBlocked(true);
        },
      );
  }, []);


  const sendRecord = (e) => {
      e.preventDefault;
    const formData = new FormData();
    formData.append("file", blobFile, "music.mp3");
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);
    formData.append("resource_type", "auto");
    Axios.post(
      "https://api.cloudinary.com/v1_1/" +
        process.env.NEXT_PUBLIC_CLOUDNAME +
        "/auto/upload",
      formData
    )
      .then((response) => {
          props.onChange({ url: response.data.url, type: "audio" });
      })
      .catch((e) => {
        console.log("Fail to upload. "+e.message);
      });
  };

  return (
    <Container>
      <CloudinaryContainer>
        <h1 style={{ textAlign: "center" }}>Record voice to send</h1>
        <br />
        {isRecording && <h3 style={{ textAlign: "right", color:"red", fontStyle: "oblique"}}>recording</h3>}
        <br />
        <Button
          onClick={() => {
            startRecord();
          }}
        >
          Start Recording
        </Button>
        <Button
          onClick={() => {
            stopRecord();
          }}
        >
          Stop Recording
        </Button>
        <Button
          onClick={() => {
            deleteRecord();
          }}
        >
          Delete Recording
        </Button>
        <Button
          onClick={(e) => {
            sendRecord(e);
          }}
        >
          Send Recording
        </Button>
        <br />
        <br />
        <audio src={blobURL} controls="controls" />
      </CloudinaryContainer>
    </Container>
  );
}

export default MicRecord;
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 110;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(250, 250, 250, 0.6);
`;

const CloudinaryContainer = styled.div`
  max-width: 350px;
  width: fit-content;
  z-index: 150;
  margin: 10%;
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;

  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
