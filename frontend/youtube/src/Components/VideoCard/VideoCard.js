import React from 'react'
import './VideoCard.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { channelClicked } from '../../ReduxToolkit/Features/OptionsSlice'
import axios from 'axios'

const VideoCard = ({YourVideo,channelId,thumbnail,title,userImg,username,views,time,video_ID}) => {
  const dispatch=useDispatch();
  // console.log("video id:"+video_ID);

const deleteVideo=async()=>{
  try{
  await axios.delete(`http://localhost:8000/api/video/delete/${video_ID}`,{withCredentials:true}).then((res)=>{alert(res.data)},window.location.reload(true))
  }
  catch(err){
    alert(err.response.data);
  }
}

const deleteVideoConfirmation=(e)=>{
  if(window.confirm("Are you sure you want to delete this video")){
    alert("Video about to be deleted");
    deleteVideo();

    e.preventDefault();
  }
}

  return (
    <div className='videocard'>
       {YourVideo&& ( <div className='delete' style={{position:"absolute",bottom:"0",right:"0",color:"white"}}onClick={(e)=>{deleteVideoConfirmation(e)}}>DELETE</div>)}
        <img src={thumbnail} alt="" className='thumbnail'/>
        <div className="videoInfo">
        <div className="second">
          {/* <Link to='/' state={{tags:"",isClicked:"false",channelClicked:"true",channelId:{channelId}}} style={{textDecoration:"none"}}> */}
            <Link to='/'>
            <img src={userImg} alt="" className='userImage1' onClick={()=>dispatch(channelClicked(channelId))}/>
            </Link>
        </div>

        <div className="third">
        <span className="title" style={{color:"white",paddingBottom:"0.18rem"}}>{title}</span>
        <span className='username' style={{fontSize:"small"}}>{username}</span>
        <div className="fourth" >
            <pre className="views" style={{fontSize:"small"}}>{views} views</pre>
            </div>
        </div>
    </div>
    </div>
  )
}

export default VideoCard