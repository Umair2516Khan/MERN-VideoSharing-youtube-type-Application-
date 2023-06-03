import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css';
import Logo from '../../assets/ytCyan.PNG';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enable } from '../../ReduxToolkit/Features/AuthSlice';
import axios from 'axios';
import { TitleSearch } from '../../ReduxToolkit/Features/OptionsSlice';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { enableUpload } from '../../ReduxToolkit/Features/CreateVideoSlice';


const Navbar = () => {
  const navigate=useNavigate();
  const logValue=useSelector((state)=>{return state.auth});
  console.log('logValue : '+logValue);
  console.log('Value:'+localStorage.getItem('loggedin'));

  const history=useNavigate();
  const [data,setData]=useState();
  const dispatch=useDispatch();
  const [videos,setVideos]=useState();
  const [loggedin,setloggedin]=useState(false);
  const refer=useRef();
  const navRef=useRef();


  
  const signout=async()=>{
    await axios.get('http://localhost:8000/api/auth/signOut',{withCredentials:true}).then((res)=>{alert("USER LOGGED OUT")}).then(localStorage.clear(),window.location.reload(true));
    
  }

  const handleClick=()=>{
    if(localStorage.getItem('loggedin')==null){
      dispatch(enable())
      // localStorage.setItem('loggedin',true);
    }
    else{
      signout();
    }
  }


  // const searchByTitle=async()=>{
  //   await axios.get(`http://localhost:8000/api/video/search/title?title=${data}`).then((res)=>{
  //     console.log(res.data);
  //     dispatch(titleSearched(res.data));
  //     setVideos(res.data);
  //   })
  // }
 
  return (
    <>
    <div className='Navbar' ref={navRef}>
      <div className='LogoName'>
         <div className='logo'>
             <img src={Logo} alt="youtube logo" />
           </div>
       {/* <div className='name'>U-Tube</div> */}
     </div>
     <div className="search">
      <form onSubmit={(e)=>{e.preventDefault();dispatch(TitleSearch(data));navigate('/')}}>
      <div className="container" ref={refer}>
        <div className='emptyCTR'></div>
      <input type="text" placeholder='search' onChange={(e)=>{setData(e.target.value)}} onClick={()=>{refer.current.style=""}}/>
      <SearchIcon sx={{"color":"white","fontSize":"30px"}}/>
     </div>
     </form>
     </div>
     <div className="sign-in" onClick={handleClick}>{localStorage.getItem('loggedin')==null?(<span>SIGN IN</span>):(<span>SIGN OUT</span>)}</div>
     <div className='addVideo'><VideoCallOutlinedIcon sx={{"color":"white","fontSize":"40px","cursor":"pointer"}} onClick={()=>{dispatch(enableUpload())}}/></div>
    </div>
    </>
  )
}

export default Navbar