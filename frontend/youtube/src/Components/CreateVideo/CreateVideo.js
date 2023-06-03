import React, { useEffect, useRef, useState } from "react";
import app from "../../Firebase";
import './CreateVideo.css'
import Logo from '../../assets/ytBlue.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage,ref,uploadBytesResumable,getDownloadURL,} from "firebase/storage";
import { useSelector,useDispatch } from "react-redux";
import { enableUpload,disableUpload } from "../../ReduxToolkit/Features/CreateVideoSlice";
import { yourVideos } from "../../ReduxToolkit/Features/OptionsSlice";
import cross from '../../assets/cancel.jpg'

const CreateVideo = ({ setOpen }) => {
const enabledUpload=useSelector((state)=>{return state.createVideo});
console.log("UPLOAD : "+enabledUpload?.state)

  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [URL,setURL]=useState({
    videoURL:'',
    imgURL:'',
  })
  const [imgPerc, setImgPerc] = useState(0);
  const [title,settitle]=useState();
  const [description,setdescription]=useState();
  const [videoPerc, setVideoPerc] = useState(0);
  const [tags, setTags] = useState([]);

  const dispatch=useDispatch();
  //to close the upload window
  const uploadRef=useRef();
  const buttonRef=useRef();

useEffect(()=>{
if(enabledUpload?.state){
    uploadRef.current.style.display="flex";
}
else if(!enabledUpload?.state){
    uploadRef.current.style.display="none";
}
},[enabledUpload?.state])

// if(imgPerc===100 && videoPerc===100 && tags.length>0 && description.length>0 && title.length>0){
// buttonRef.current.style.disabled="false";
// buttonRef.current.style.backgroundColor="rgb(39, 139, 197)";
// }
// else{
//     buttonRef.current.style.disabled="true";
// buttonRef.current.style.backgroundColor="gray";
// }

  const navigate = useNavigate()

//   const handleChange = (e) => {
//     setInputs((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };

const uploadVideo=async()=>{
    await axios.post('http://localhost:8000/api/video/create',{
    title:title,
    videoURL:URL.videoURL,
    imgURL:URL.imgURL,
    desc:description,
    tags:tags
    },{withCredentials:true})
    dispatch(disableUpload());
    navigate('/');
    dispatch(yourVideos());
}

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgURL" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setURL((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoURL");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgURL");
  }, [img]);


    return (
        <div className='overlay_Upload' ref={uploadRef}>
        <div className='upload' style={{display:"flex",flexDirection:"column",gap:"2rem",}}>
            <div className="firstA_Upload" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img src={cross} alt="" onClick={()=>{dispatch(disableUpload())}} style={{cursor:"pointer",position:"absolute",width:"1.4rem",height:"1.4rem",right:"1rem",top:"0.4rem"}}/>
                  {/* <img src={cancel} alt="cancel sign" style={{height:"3.1rem",width:"3rem",position:"absolute",top:"0.5rem",right:"1rem",cursor:"pointer"}} /> */}
                  <div style={{display:"flex",flexDirection:"row"}}><img src={Logo} alt="youtube logo" style={{height:"8rem",width:"10rem"}}/> </div>
            </div>
            <div className="secondA_Upload">
                    <span style={{color:"white",fontStyle:"italic",fontWeight:"bolder"}}>Select a Video :</span>
                <div className="inputT_Upload">{videoPerc>0?(<span>Uploading:{videoPerc}%</span>):(<><span>Upload Video</span><input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} /></>)}
                </div>  
                 
                <span style={{color:"white",fontStyle:"italic",fontWeight:"bolder"}}>Select a thumbnail :</span>
                <div className="inputT_Upload">{imgPerc>0?(<span>Uploading:{imgPerc}%</span>):(<><span>Upload Thumbnail</span><input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} /></>)}
                </div>
                <div className="inputT_Upload"><input type='text' placeholder='Enter Video Title' onChange={(e)=>{settitle(e.target.value)}}/></div>
                <div className="inputT_Upload"><input type='text' placeholder='Enter Video Tags(separate with comas)' onChange={(e)=>{handleTags(e)}}/></div>
                <div className="inputT_Upload"><input type='text' placeholder='Enter Video Description' onChange={(e)=>{setdescription(e.target.value)}}/></div>
            </div>
            <div className="thirdA_Upload" style={{display:"flex",justifyContent:"center",alignItems:"center"}} ref={buttonRef} onClick={uploadVideo}>Upload</div>
            <div className="fourthA_Upload" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               <span>WEB ENGINEERING <span className='S2' >PROJECT</span></span> 
            </div>
        </div>
        </div>
      )

//   return (
//     <Container>
//       <Wrapper>
//         <Close onClick={() => setOpen(false)}>X</Close>
//         <Title>Upload a New Video</Title>
//         <Label>Video:</Label>
//         {videoPerc > 0 ? (
//           "Uploading:" + videoPerc
//         ) : (
//           <Input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setVideo(e.target.files[0])}
//           />
//         )}
//         <Input
//           type="text"
//           placeholder="Title"
//           name="title"
//           onChange={handleChange}
//         />
//         <Desc
//           placeholder="Description"
//           name="desc"
//           rows={8}
//           onChange={handleChange}
//         />
//         <Input
//           type="text"
//           placeholder="Separate the tags with commas."
//           onChance={handleTags}
//         />
//         <Label>Image:</Label>
//         {imgPerc > 0 ? (
//           "Uploading:" + imgPerc + "%"
//         ) : (
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImg(e.target.files[0])}
//           />
//         )}
//         <Button onClick={handleUpload}>Upload</Button>
//       </Wrapper>
//     </Container>
//   );
}


export default CreateVideo;