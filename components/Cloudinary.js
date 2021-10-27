import { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { Button } from "@material-ui/core";

function Cloudinary(props) {
  // handles cloudinary upload and providing the link for a parent component
  const [imageSelected, setImageSelected] = useState("");
  const [videoSelected, setVideoSelected] = useState("");
  const pictureUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);
    formData.append("resource_type", "auto");
    Axios.post(
      "https://api.cloudinary.com/v1_1/" +
        process.env.NEXT_PUBLIC_CLOUDNAME +
        "/auto/upload",
      formData
    )
      .then((response) => {
        setImageSelected("");
        console.log(response.data.url);
        console.log(event.target.parentElement.previousSibling.value);
        event.target.parentElement.previousSibling.value = "";
        if (response.data.url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null) {
          props.onChange({ url: response.data.url, type: "img" });
          setImageSelected(response.data.url);
        } else if (
          response.data.url.match(
            /\.(avi|mov|mp4|wmv|webm|mpg|mp2|mpeg|mpe|mpv|ogg|m4p|m4v)$/
          ) != null
        ) {
          props.onChange({ url: response.data.url, type: "video" });
          setVideoSelected(response.data.url);
        } else if (response.data.url.match(/\.(mp3|wav|ogg)$/) != null) {
          props.onChange({ url: response.data.url, type: "audio" });
          setVideoSelected(response.data.url);
        } else props.onChange({ url: response.data.url, type: "file" });

        // props.getImgUrl(response.data.url);
      })
      .catch((e) => {
        console.log("Fail to upload. (check file size limit!");
      });
  };

  return (
    <Container>
      <CloudinaryContainer>
        <h1 style={{ textAlign: "center" }}>Upload Files to send</h1>
        <br />
        <br />
        <input
          type="file"
          onChange={(event) => setImageSelected(event.target.files[0])}
        />
        <Button
          onClick={(e) => {
            pictureUpload(e);
          }}
        >
          Attach file
        </Button>

        <br />
        <br />

      </CloudinaryContainer>
    </Container>
  );
}

export default Cloudinary;
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
  width: 60%;
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
