import React, { useEffect, useRef, useState } from 'react'
import './Auth.css';
import { useSelector,useDispatch } from 'react-redux';
import { enable,disable } from '../../ReduxToolkit/Features/AuthSlice';
import Logo from '../../assets/ytBlue.jpg';
import cancel from '../../assets/cancel.png';
import axios from 'axios';


const Auth = () => {

    const dispatch=useDispatch();

    const [signup,setSignup]=useState(false);
    const [email,setemail]=useState();
    const [password,setPassword]=useState();
    const [Username,setUsername]=useState();
    const [URL,setURL]=useState();
    const enabled=useSelector((state) =>{return state.auth})
    // console.log(enabled);
    const authRef=useRef();

 //using useEffect here because at initaial render the value of ref is undefined or null
 useEffect(()=>{
    if(enabled.state){
        authRef.current.style.display="flex";    
    }
    else if(!enabled.state){
    authRef.current.style.display="none";
    }
 },[enabled])

 const login=async()=>{
    try{
    const userData=await axios.post("http://localhost:8000/api/auth/login",{
        email:email,
        password:password
    }, {withCredentials: true});
    console.log(userData.data.susbcribedTo);
    localStorage.clear();
    localStorage.setItem("username",userData.data.name);
    localStorage.setItem("id",userData.data._id);
    localStorage.setItem("profile_pic",userData.data.image);
    localStorage.setItem("loggedin",true);
    localStorage.setItem("subscribedTo",userData.data.susbcribedTo);
    localStorage.setItem("likedVideo",userData.data.likedVideos);
    localStorage.setItem("dislikedVideos",userData.data.dislikedVideos);
    //it will reload the page when user logs in
    window.location.reload(true);
    }
    catch(error){
        console.log(error.message)
    }
}

const CreateAccount=async()=>{
    try{
    const userData=await axios.post("http://localhost:8000/api/auth/signup",{
        email:email,
        password:password,
        name:Username,
        image:URL,
    }, {withCredentials: true})
    console.log(userData.data);
    // localStorage.setItem("username",userData.name);
    // localStorage.setItem("id",userData._id);
    // localStorage.setItem("profile_pic",userData._image);
    // localStorage.setItem("subscribedTo",userData.subscribedTo);
    // localStorage.setItem("likedVideo",userData.likedVideos);
    // localStorage.setItem("dislikedVideos",userData.dislikedVideos);
    }
    catch(error){
        console.log(error.response.data)
    }
}

 if(signup){
    return (
        <div className='overlay' ref={authRef}>
        <div className='Auth' style={{display:"flex",flexDirection:"column",gap:"2rem",}}>
            <div className="firstA" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <img src={cancel} alt="cancel sign" style={{height:"3.1rem",width:"3rem",position:"absolute",top:"0.5rem",right:"1rem",cursor:"pointer"}} onClick={()=>{dispatch(disable())}}/>
                  <div style={{display:"flex",flexDirection:"row"}}><img src={Logo} alt="youtube logo" style={{height:"8rem",width:"10rem"}}/> </div>
            </div>
            <div className="secondA">
                <div className="inputT"><input type='email' placeholder='Email'onChange={(e)=>{setemail(e.target.value)}}/></div>
                <div className="inputT"><input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div className="inputT"><input type='text' placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/></div>
                <div className="inputT"><input type='text' placeholder='Profile Picture URL' onChange={(e)=>{setURL(e.target.value)}}/></div>
            </div>
            <div className="thirdA" style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={CreateAccount}>Sign up</div>
            <div className="fourthA" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               <span>Already have an account, <span className='S2' onClick={()=>{setSignup(false)}}>Login</span></span> 
            </div>
        </div>
        </div>
      )
 }

 else if(!signup){
  return (
    <div className='overlay' ref={authRef}>
    <div className='Auth' style={{display:"flex",flexDirection:"column",gap:"2rem"}}>
        <div className="firstA" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <img src={cancel} alt="cancel sign" style={{height:"3.1rem",width:"3rem",position:"absolute",top:"0.5rem",right:"1rem",cursor:"pointer"}} onClick={()=>{dispatch(disable())}}/>
              <div style={{display:"flex",flexDirection:"row"}}><img src={Logo} alt="youtube logo" style={{height:"8rem",width:"10rem"}}/> <span>U-TUBE</span> </div>
        </div>
        <div className="secondA">
            <div className="inputT"><input type='email' placeholder='Email'onChange={(e)=>{setemail(e.target.value)}}/></div>
            <div className="inputT"><input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/></div>
        </div>
        <div className="thirdA" style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={login}>Login</div>
        <div className="fourthA" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
           <span>Don't have an account yet, <span className='S2' onClick={()=>{setSignup(true)}}>Signup</span></span> 
        </div>
    </div>
 </div>
  )
 }
}

export default Auth