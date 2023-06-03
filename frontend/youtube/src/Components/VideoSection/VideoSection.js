import React, { useEffect, useMemo, useRef, useState } from 'react'
import './VideoSection.css';
import VideoCard from '../VideoCard/VideoCard';
import {Link,Route,Routes, useLocation} from 'react-router-dom';
import VideoDisplay from '../VideoDisplay/VideoDisplay';
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';
import { channelClicked } from '../../ReduxToolkit/Features/OptionsSlice';

const VideoSection = () => {
    const [YourVideo,setYourVideo]=useState(false);
    const isMounted=useRef(false);

    const value_of_option=useSelector((state)=>{
        return state.option?.state?.value});
    const ischannelClicked=useSelector((state)=>{return state.option?.state?.channelClicked});
    const channelID=useSelector((state)=>{return state.option?.state?.channelID});

    const isSubscribtionClicked=useSelector((state)=>{return state.option?.state?.subscribtionClicked});

    // console.log(value_of_option)
    // console.log(channel);
    const search_by_title=useSelector((state)=>{return state.option?.state?.title});
const dispatch=useDispatch();
    
//setting this flag to see if yourVideos is empty or not;
    const [flag,setFlag]=useState(false);
    const [channelvideos,setChannelVideos]=useState();
    const [videos,setVideos]=useState();
    const [TitleVideos,setTitleVideos]=useState();
    const [defaultVideos,setDefaultVideos]=useState();

    const [Loading,setLoading]=useState(true);
    const [subscribtions,setSubscribtions]=useState();
    const [channelDetails,setChannelDetails]=useState();
    const [subscribers,setSubscribers]=useState(0);
    const [subscribed,setSubscribed]=useState(false);
    const [subscribe_Loading,setsubscribe_Loading]=useState(true);

  
    let tagArray=[];
    const [waiting,setWaiting]=useState(true);
    setTimeout(()=>{
     setWaiting(false);
    },5000)
    async function fetchDefaultvideos(){
        await axios.get('http://localhost:8000/api/video/random').then((res)=>{
            setVideos(res.data);
        }
        )
        }

    async function fetchByTag(tag){
        tagArray.push(tag);
        await axios.post("http://localhost:8000/api/video/tags",{tags:tagArray}).then((res)=>{setVideos(res.data)}).catch((err)=>{console.log(err)})  
        
     }
    async function getTopVideos(){
        await axios.get("http://localhost:8000/api/video/top").then((res)=>{setVideos(res.data)}).catch((err)=>{console.log(err)})
        
    }
    async function fetchChannelVideos(CID){
        console.log("channelFunctionInvoked")
        await axios.get(`http://localhost:8000/api/video/getChannelVideos/${CID}`).then((res)=>{
            console.log(res.data);
            setChannelVideos(res.data);
        }).catch((err)=>{console.log(err)})
    }

    async function getYourVideos(){
       localStorage.getItem('id')!=null &&(
        await axios.get(`http://localhost:8000/api/video/getChannelVideos/${localStorage.getItem('id')}`).then((res)=>{
            setVideos(res.data);
            setYourVideo(true);
        }).catch((err)=>{console.log(err)})
       )
    }
   
      async function getByID(id){
        await axios.get(`http://localhost:8000/api/user/find/${id}`).then((res)=>{setChannelDetails(res.data)}).catch((err)=>{console.log(err)})
      }

      const fetch_no_of_subscribers=async(channelId)=>{
        try{
            setLoading(true);
            const res=await axios.get(`http://localhost:8000/api/user/find/${channelId}`,{withCredentials:true}).then((res)=>{
                setSubscribers(res.data.subscribers);
                setLoading(false);
            })
        }
        catch(error){
            console.log(error)
        }
    }
    const subscribe=async(channelId)=>{
        try{
           await axios.put(`http://localhost:8000/api/user/sub/${channelId}`,{},{withCredentials:true})
           fetch_no_of_subscribers(channelId);
        }
        catch(error){
            console.log(error)
        }
    }
    const searchByTitle=async()=>{
        await axios.get(`http://localhost:8000/api/video/search/title?title=${search_by_title}`).then((res)=>{
          setTitleVideos(res.data);
        })
      }
       
     const isUserLoggedIn =async()=>{
        await axios.get('http://localhost:8000/api/auth/islogin',{withCredentials:true}).then((res)=>{
            // console.log(res.data);
        if(!res.data){
            console.log("user does not exists");
            //if there is no token in cookies then we will delete user credentials from the local storage
            localStorage.clear();
        }    
        else if(res.data){
            console.log("user exists");
        }
        })
     }

    const getLikedVideos=async()=>{
        try{
     await axios.get('http://localhost:8000/api/user/likedVideos',{withCredentials:true}).then((res)=>{
        setVideos(res.data);
        console.log(res.data)
     })
    }
catch(err){
    console.log(err.message);
}
    }

    const getSubscribtions=async()=>{
        await axios.get('http://localhost:8000/api/user/subscribtions',{withCredentials:true}).then((res)=>{
            setSubscribtions(res.data);
        })
    }
    
    const isSubscribed=async()=>{
        try{
        await axios.get(`http://localhost:8000/api/user/isSubscribed/${channelID}`,{withCredentials:true}).then((res)=>{
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
   
    const subscribeButtonClicked=()=>{
        subscribe(channelID);
        if(channelID!==localStorage.getItem('id')){
        if(localStorage.getItem('loggedin')!=null){
        setSubscribed(!subscribed);
    }
    } 
    }

useEffect(()=>{
    console.log("first load");
    fetchDefaultvideos();
    isUserLoggedIn();
    isSubscribed();
    if(localStorage.getItem('loggedin')==null){
        setsubscribe_Loading(false);
        setSubscribed(false);
       }
},[])

useEffect(()=>{
    if(isMounted.current){
    if(value_of_option==="home"){
        fetchDefaultvideos()
        setYourVideo(false);
    }
    else if(value_of_option==="top"){
        getTopVideos();
        setYourVideo(false);
    }
    else if(value_of_option==="sports"){
        fetchByTag(value_of_option);
        setYourVideo(false);
    }
    else if(value_of_option==="yourVideos"){
        getYourVideos();
    }
    else if(value_of_option==="liked"){
        getLikedVideos();
        setYourVideo(false);
    }
    else if(value_of_option==="gaming"){
        fetchByTag(value_of_option);
        setYourVideo(false);
    }
    else if(value_of_option==="education"){
        fetchByTag(value_of_option);
        setYourVideo(false);
    }
    else if(value_of_option==="technology"){
        fetchByTag(value_of_option);
        setYourVideo(false);
    }
}
else if(!isMounted.current){
    isMounted.current=true;
}
},[value_of_option])

useEffect(()=>{
    fetchChannelVideos(channelID);
    getByID(channelID);
    fetch_no_of_subscribers(channelID);
    setYourVideo(false);
},[ischannelClicked]);

useEffect(()=>{
searchByTitle();
setYourVideo(false);
},[search_by_title])

useEffect(()=>{
getSubscribtions();
},[isSubscribtionClicked])
 


if(isSubscribtionClicked){
    if(!subscribtions){
    return(<div style={{height:"200px",width:"200px",backgroundColor:"white"}}></div>)
    }
    else if(subscribtions){
        return(
            <div className='subscribtions' style={{display:"flex",gap:"4rem",flexWrap:"wrap",padding:"3rem"}}>
                {
                    subscribtions.map((val)=>{
                        return(
                            <Link to="/" style={{textDecoration:"none"}}>
                            <div style={{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"}} onClick={()=>{dispatch(channelClicked(val._id));console.log("channel open")}}>
                                <img src={val.image} alt="" style={{height:"150px",width:"175px",borderRadius:"50%"}}/>
                                <span style={{color:"white",fontSize:"1.7rem",fontWeight:"bolder"}}>{val.name}</span>
                                <pre style={{color:"rgb(169, 162, 162)",fontStyle:"italic"}}>{val.subscribers} subscribers</pre>
                            </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}



else if(search_by_title){
    if(!TitleVideos){
                return(<div style={{color:"white"}}>Loading....</div>)
    }
    else if(TitleVideos){
  return (
    <div className='videosection'>
        {TitleVideos?.map((val)=>{
            
            // console.log("value of ID:"+val._id)
            // console.log(val.userId);  
            return(
                <Link to="/video" state={val} style={{textDecoration:"none"}}>
            <div className='videoCard' key={val._id} onClick={async()=>{
    await axios.put(`http://localhost:8000/api/video/view/${val._id}`)}}>
            <VideoCard YourVideo={YourVideo} channelId={val.userId} thumbnail={val.imgURL} title={val.title} userImg={val.user_pic} username={val.username}
            views={val.views} time={val.time} videoID={val._id}
            />
        </div>
        </Link>
        )
        })}
    </div>
  )
    }
} 
else if(!ischannelClicked){
    if (flag){
        return(<div style={{color:"white"}}>You have not uploaded any video</div>)
    }
    else if(!videos){
                return(<div style={{color:"white"}}>Loading....</div>)
    }
    else if(videos){
  return (
    <div className='videosection'>
        {videos?.map((val)=>{
            // console.log(val);  
            // console.log("value of ID:"+val._id)
            return(
                <Link to="/video" state={val} style={{textDecoration:"none"}}>
            <div className='videoCard' key={val._id} onClick={async()=>{
    await axios.put(`http://localhost:8000/api/video/view/${val._id}`)}}>
            <VideoCard YourVideo={YourVideo} channelId={val.userId} thumbnail={val.imgURL} title={val.title} userImg={val.user_pic} username={val.username}
            views={val.views} time={val.time} video_ID={val._id}
            />
        </div>
        </Link>
        )
        })}
    </div>
  )
    }
}

else if(ischannelClicked){
        if(!channelvideos && !channelDetails){
            return(<div style={{color:"black"}}>Loading....</div>)
        }

        else if(channelvideos && channelDetails){
        return (
            <div className='channelPage' style={{display:'flex',flexDirection:'column',gap:"2rem"}}>
            <div className='channelDetails' style={{color:"white",flex:"1",display:"flex",alignItems:"center",gap:"1rem"}}>
                <img src={channelDetails.image} alt="channel picture" style={{height:"100px",width:"115px",borderRadius:"50%"}}/>
                <div className='secondaryDetails' style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
                    <span style={{fontSize:"2rem",fontWeight:"bolder"}}>{channelDetails.name}</span>
                    <span style={{fontSize:"1.2rem",fontStyle:"italic",fontWeight:"500"}}>{Loading?(<span>...</span>):(<span>{subscribers}</span>)} subscribers</span>
                </div>
                {
                              <div className="subscribeBTN" onClick={subscribeButtonClicked} style={subscribed?{backgroundColor:"gray"}:{backgroundColor:"#2A00AD",color:"white"}}>
                              {subscribe_Loading?(<span>...</span>):(
                                subscribed?(<span>Unsubscribe</span>):(<span>Subscribe</span>)
                              )}
                                  </div>
              
        }
            </div>
            <div className='videosection' style={{flex:"3"}}>
                {channelvideos.map((val)=>{   
                    return(
                        <Link to="/video" state={val} style={{textDecoration:"none"}}>
                    <div className='videoCard' key={val.id}>
                    <VideoCard YourVideo={YourVideo} channelId={val.userId} thumbnail={val.imgURL} title={val.title} userImg={val.user_pic} username={val.username}
                    views={val.views} time={val.time} videoID={val._id}
                    />
                </div>
                </Link>
                )
                })}
            </div>
            </div>
          )}
            }       
    }

// else if(value_of_option?.state?.subscribtionClicked){
//     return(<div style={{height:"200px",width:"200px",backgroundColor:"white"}}>hellow</div>)
// }


export default VideoSection