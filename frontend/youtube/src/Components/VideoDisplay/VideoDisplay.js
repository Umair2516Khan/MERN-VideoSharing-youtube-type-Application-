import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import './VideoDisplay.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import Comment from '../Comment/Comment';
import Related from '../Related/Related';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import { channelClicked } from '../../ReduxToolkit/Features/OptionsSlice';
import { useDispatch } from 'react-redux';
import cancel from '../../assets/cancel.jpg';

const VideoDisplay = () => {
    const dispatch=useDispatch();
    const location=useLocation();
    const videodata=location.state;
    const videoref=useRef();
    const relatedref=useRef();
    const [like_Loading,setlike_Loading]=useState(true);
    const [dislike_Loading,setdislike_Loading]=useState(true);
    const [subscribe_Loading,setsubscribe_Loading]=useState(true);
    const [relatedVideo,setRelatedVideo]=useState("h");
    const [comments,setComments]=useState("h");
    const [commentDesc,setCommentDesc]=useState();
    const [error,setError]=useState();
    const [subscribers,setSubscribers]=useState(0);
    const [liked,setLiked]=useState(false);
    const [disliked,setdisLiked]=useState(false);
    const [subscribed,setSubscribed]=useState(false);
    // console.log(commentDesc)
    // console.log(videodata);
    
    // console.log("SUBSCRIBED LOADING "+subscribe_Loading);

    const videotags=videodata.tags;
    // console.log(videotags);
    const title=videodata.title;
    const user_img=videodata.user_pic;
    const vid_thumbnail=videodata.imgURL;
    const videoDescription=videodata.desc;
    const vid_id=videodata._id;
    const videoViews=videodata.views;
    //userID and channelId means the same
    const channelId=videodata.userId;
    const username=videodata.username;
    const videoURL=videodata.videoURL;
    

    const createdAt=videodata.createdAt;
    const date=new Date(createdAt);
    const date_day=date.getDate();
    const date_month=date.getMonth()+1;
    //using toLocaleString method to convert month number to month name
    const date_month_String=date.toLocaleString('en-US', { month: 'long' });
    const date_year=date.getFullYear();
    
    let no_of_likes=videodata.no_of_likes;
    let no_of_dislikes=videodata.no_of_dislikes;
    
    // const no_of_dislikes=videodata.no_of_dislikes;
    // console.log(no_of_likes);
    // console.log(vid_id);
    
    const [likes,setLikes]=useState(no_of_likes);
    const [dislikes,setdisLikes]=useState(no_of_dislikes);

    
   const viewIncrease=async()=>{
    await axios.put(`http://localhost:8000/api/video/viewIncrease/${vid_id}`)
   }

    const fetchRelatedVideo=async()=>{
        await axios.post('http://localhost:8000/api/video/tags',{
            tags:videotags
        }).then((res)=>{ setRelatedVideo(res.data)})
    }

    const fetchComments=async()=>{
       await axios.get(`http://localhost:8000/api/comments/allcomments/${vid_id}`).then((res)=>{setComments(res.data)},{withCredentials:true});
    }
    const fetch_no_of_Likes=async()=>{
        const res=await axios.get(`http://localhost:8000/api/video/find/${vid_id}`,{withCredentials:true});
        setLikes(res.data.no_of_likes);   
    }
    const fetch_no_of_disLikes=async()=>{
        const res=await axios.get(`http://localhost:8000/api/video/find/${vid_id}`,{withCredentials:true});
        setdisLikes(res.data.no_of_dislikes);   
    }
    const fetch_no_of_subscribers=async()=>{
        try{
            const res=await axios.get(`http://localhost:8000/api/user/find/${channelId}`,{withCredentials:true})
            setSubscribers(res.data.subscribers);
        }
        catch(error){
            console.log(error)
        }
    }

    const isLiked=async()=>{
        try{
        await axios.get(`http://localhost:8000/api/video/isLiked/${vid_id}`,{withCredentials:true}).then((res)=>{
            setLiked(res.data);
            //this loading is only to check if the video is liked or not before showing it on the screen
            setlike_Loading(false);
        }
        );
        }
        catch(error){
            console.log(error.message)
        }
    }

    const isdisLiked=async()=>{
        try{
        await axios.get(`http://localhost:8000/api/video/isdisLiked/${vid_id}`,{withCredentials:true}).then((res)=>{
            setdisLiked(res.data);
            //this loading is only to check if the video is liked or not before showing it on the screen
            setdislike_Loading(false);
        }
        );
        }
        catch(error){
            console.log(error.message)
        }
    }
    
    const isSubscribed=async()=>{
        try{
        await axios.get(`http://localhost:8000/api/user/isSubscribed/${channelId}`,{withCredentials:true}).then((res)=>{
            setSubscribed(res.data);
            //this loading is only to check if the video is liked or not before showing it on the screen
            setsubscribe_Loading(false);
        }
        );
        }
        catch(error){
            console.log("error aagaya bhae"+error.message)
        }
    }

    useEffect(()=>{
        fetchRelatedVideo();
        fetchComments();
        fetch_no_of_Likes();
        fetch_no_of_disLikes();
        fetch_no_of_subscribers();
        isLiked();
        isdisLiked();
        isSubscribed();
        if(localStorage.getItem('loggedin')==null){
         setLiked(false);
         setdisLiked(false);
         setlike_Loading(false);
         setdislike_Loading(false);
         setsubscribe_Loading(false);
         setSubscribed(false);
        }
    },[])

    //this will function when a comment is deleted
    useEffect(()=>{
        fetchComments()
    },[comments])


   
    // if (relatedVideo!=="h") {console.log(relatedVideo)}
    
const OpenSlider=()=>{
    relatedref.current.style.display="flex";
   setTimeout(()=>{
    relatedref.current.style.marginRight="2px";
    relatedref.current.style.transition="2s";

   },0.1)
}
const CloseSlider=()=>{
    videoref.current.style.overflow="scroll";
    relatedref.current.style.marginRight="-600px";
    videoref.current.style.position="relative";
    relatedref.current.style.transition="2s";
    setTimeout(()=>{
        relatedref.current.style.display="none";
    },900)
}

const subscribe=async()=>{
    try{
       await axios.put(`http://localhost:8000/api/user/sub/${channelId}`,{},{withCredentials:true})
       fetch_no_of_subscribers();
    }
    catch(error){
        alert(error.response.data);
    }
}
const addComment = async()=>{
    try{
    const response=await axios.post(`http://localhost:8000/api/comments/add/${vid_id}`,{
        desc:commentDesc,
    },{withCredentials:true})
    // console.log(response)
    }
    catch(error){
        alert(error.response.data);
    }
    setCommentDesc("");
    fetchComments();
}

const likeVideo=async()=>{
    try{
     await axios.put(`http://localhost:8000/api/video/likevideo/${vid_id}`,{},{withCredentials:true});

     fetch_no_of_Likes();
     fetch_no_of_disLikes();
    }
    catch(error){
        alert(error.response.data);
    }
}
// console.log(likes);

const dislikeVideo=async()=>{
    try{
     await axios.put(`http://localhost:8000/api/video/dislikevideo/${vid_id}`,{},{withCredentials:true})
    
     fetch_no_of_disLikes();
     fetch_no_of_Likes();
    }
    catch(error){
        alert(error.response.data);
    }
}

const dislikeButtonClicked=()=>{
    dislikeVideo();
    if(localStorage.getItem('loggedin')!=null){
    setdisLiked(!disliked);
    if(liked){
        setLiked(!liked);
    }
}
}

const likeButtonClicked=()=>{
    likeVideo();
    if(localStorage.getItem('loggedin')!=null){
    setLiked(!liked);
    if(disliked){
        setdisLiked(!disliked);
    }
}
}    

const subscribeButtonClicked=()=>{
    subscribe();
    if(channelId!==localStorage.getItem('id')){
    if(localStorage.getItem('loggedin')!=null){
    setSubscribed(!subscribed);
}
} 
}

if(relatedVideo!=="h" && comments!=="h"){
  return (
    <>
    <div className="display">
        <div className='video' ref={videoref}>
            <div className="Menu-button">
                <MenuOpenIcon onClick={OpenSlider} sx={{cursor:"pointer",fontSize:"2rem"}}/>
            </div>
            <div className="videoPlayer">
                <video controls src={videoURL} type="video/mp4" className='videoPlayer_play'></video>
            </div>
            <span className="videotitle">{title}</span>
            <div className="videoinfo">
                <div className="vi1">
                <Link to='/' state={{tags:"",isClicked:"false",channelClicked:"true",channelId:{channelId}}} style={{textDecoration:"none"}}>      
                <img src={user_img} alt="" className="userImage" onClick={()=>dispatch(channelClicked(channelId))}/>
                </Link>
                <div className="user-Info">
                    <span className="username">{username}</span>
                    <span className="subscribers-no">{subscribers} subscribers</span>
                </div>
                </div>
                <div className="vi2">
                <div className="review">
                    
                       <div className="like" onClick={likeButtonClicked} >
                        {like_Loading?(<span>...</span>):(<>
                        <ThumbUpOutlinedIcon sx={liked?({color:"#0597F8",marginRight:"3px",fontSize:"30px"}):({color:"white",marginRight:"3px"})} /> 
                        <span>{likes}</span>
                        </>)}
                        </div>

                    <span>|</span>

                     <div className="dislike" onClick={dislikeButtonClicked}>
                     {dislike_Loading?(<span>...</span>):(<>
                        <ThumbDownOutlinedIcon sx={disliked?({color:"#0597F8",marginRight:"3px",fontSize:"30px"}):({color:"white",marginRight:"3px"})} /> 
                        <span>{dislikes}</span>
                        </>)}
                        </div>

                </div>
                <div className="subscribeBTN" onClick={subscribeButtonClicked} style={subscribed?{backgroundColor:"gray"}:{backgroundColor:"#2A00AD",color:"white"}}>
                {subscribe_Loading?(<span>...</span>):(
                  subscribed?(<span>Unsubscribe</span>):(<span>Subscribe</span>)
                )}
                    </div>
                </div>
            </div>
            <div className="description">
                <div className="desc1">
                    <span>{videoViews} views </span>
                    <span style={{display:"flex",gap:"0.2rem"}}><pre>{date_month_String}</pre><pre>{date_day},</pre><pre>{date_year}</pre></span>

                </div>
                <div className="desc2">
                    <span>{videoDescription}</span>
                </div>
            </div>
            <div className="commentSection">
                <span className="commenttitile">Comments</span>
                <div className="usercomment">
                    <img src={localStorage.getItem('profile_pic')} alt="" className="userImage" />
                    <div className="commentinput">
                        <input type="text" placeholder='Add a comment' value={commentDesc} onChange={(e)=>{setCommentDesc(e.target.value)}}/>
                    </div>
                    <div className="CSubmit" onClick={addComment}>Submit</div>
                </div>
                <div className="commentbox">
                  {comments.map((val)=>{
                    return(
                        <div>
                            <Comment profile_pic={val.user_pic} username={val.username} desc={val.desc} commentID={val._id}/>
                        </div>
                    )
                  })}
                </div>
            </div>
        </div>

<div className="related" ref={relatedref} >
    <div className='closeRelatedVideos'>
    <img src={cancel} onClick={CloseSlider}/>
    </div>
{relatedVideo.map((val)=>{ 
        return (
            <div onClick={()=>{window.location.reload(true);}}>
            <Link to="/video" state={val} style={{textDecoration:"none"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"2rem"}} onClick={async()=>{
    await axios.put(`http://localhost:8000/api/video/view/${val._id}`)
   }}>
        <Related username={val.username} image={val.imgURL} title={val.title} views={val.views} />
        {/* <Related username={val.username} image={val.imgURL} title={val.title} views={val.views} /> */}
        </div>
        </Link>
        </div>)
})
}
        </div>
        </div>
        </>
  )}
  else if(relatedVideo==="h" && comments==="h"){
    return (
        <div style={{color:"white"}}>Loading....</div>
    )
  }
}

export default VideoDisplay