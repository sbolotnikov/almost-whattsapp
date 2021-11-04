import {useState} from 'react';
import Axios from 'axios'

function CloudinaryButton(props) {
    // handles cloudinary upload and providing the link for a parent component
    const [imageSelected, setImageSelected]=useState('');
    const pictureUpload=(event)=> {
       const formData= new FormData();
       formData.append('file', imageSelected);
       formData.append('upload_preset',process.env.NEXT_PUBLIC_CLOUD_PRESET);
       Axios.post(
           "https://api.cloudinary.com/v1_1/"+process.env.NEXT_PUBLIC_CLOUDNAME+"/image/upload",
           formData
       )
       .then(response=>{
        setImageSelected("");
        console.log(response.data.url)
        console.log(event.target.parentElement.previousSibling.value)
        event.target.parentElement.previousSibling.value=""; 
        props.getImgUrl(response.data.url);
        })
        .catch(e=>{console.log('Fail to upload image')})
    }

    return(
        <div style={{display:'flex', alignItems:'center', justifyContent:'start', marginLeft:'2%', maxWidth:'600px'}}>
            <input type='file' onChange={(event)=>setImageSelected(event.target.files[0])}/>
            <div className="cloudinary-button testNav" onClick={(e)=>{pictureUpload(e)}}>Upload Image</div>
        </div>
    )
    }
export default CloudinaryButton
