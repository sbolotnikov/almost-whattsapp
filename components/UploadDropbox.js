import { useState } from "react";
import DropboxChooser from "react-dropbox-chooser";
import styled from "styled-components";

export default function UploadDropbox() {
  const [url, setUrl] = useState("");
  function handleSuccess(files) {
    setUrl(files[0].thumbnailLink);
    console.log(url);
  }
  return (
    <Container>

      <DropBoxContainer>
      <h1 style={{ textAlign: "center" }}>Upload Or Choose Files to DropBox</h1>
      <br />
      <br />
        <DropboxChooser
          appKey={process.env.NEXT_PUBLIC_DROPBOX_APPKEY}
          success={handleSuccess}
          cancel={() => console.log("closed")}
          multiselect={true}
        >
          <button>Upload or Choose Files</button>
          <div className="dropbox"></div>
          <br />
          <br />
          <img src={url} width="200" height="200" alt="" />
        </DropboxChooser>
      </DropBoxContainer>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  top: 0;
  left:0;
  z-index: 110;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  background-color:rgba(250,250,250,0.6)
`;

const DropBoxContainer = styled.div`
 max-width:350px;
  width:60%;
  z-index:150;
  margin: 10%;
  padding: 3%3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;

  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7)
`;
