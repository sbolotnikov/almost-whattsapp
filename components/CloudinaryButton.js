import {useState} from 'react';
import Axios from 'axios'
import styled from "styled-components";
import { Button } from "@material-ui/core";
function CloudinaryButton(props) {
    // handles cloudinary upload and providing the link for a parent component
    // const [imageSelected, setImageSelected]=useState('');
    const pictureUpload=(event, imageSelected)=> {
      console.log(event.target, imageSelected)
       const formData= new FormData();
       formData.append('file', imageSelected);
       formData.append('upload_preset',process.env.NEXT_PUBLIC_CLOUD_PRESET);
       Axios.post(
           "https://api.cloudinary.com/v1_1/"+process.env.NEXT_PUBLIC_CLOUDNAME+"/image/upload",
           formData
       )
       .then(response=>{
        let url=response.data.url;
        console.log(url);
        event.target.value=""; 
        props.getImgUrl(url);
        })
        .catch(e=>{console.log('Fail to upload image', e)})
    }

    return(
        <Container>
            <InputStyled id="selectImage" hidden type='file' onChange={(event)=>{pictureUpload(event, event.target.files[0])}}/>
            <StyleButton onClick={()=>{document.getElementById("selectImage").click()}}>Upload Image</StyleButton>
        </Container>
    )
    }
export default CloudinaryButton
const Container = styled.div`
display:flex;
flex-direction: column;
align-items:center;
margin-top:10px;
`;
const InputStyled = styled.input`
  
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;
const StyleButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;