import React, { useRef, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SchoolIcon from '@mui/icons-material/School';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MemoryOutlinedIcon from '@material-ui/icons/MemoryOutlined';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { liked,top,gaming,sports,technology,education,yourVideos,home,subscribtionClicked } from '../../ReduxToolkit/Features/OptionsSlice';

const Sidebar = () => {


const dispatch=useDispatch();
  return (
   <div className='sidebar'>
   <div className="Sfirst" id='box' >

     <Link to='/' style={{textDecoration:"none",color:"white"}}>
     <div className="Shome" id='level' onClick={()=>{dispatch(home())}}>
      <HomeIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Home</span>
     </div>
     </Link>

     <Link to='/' style={{textDecoration:"none",color:"white"}}>
     <div className="yourVideo" id='level' onClick={()=>{dispatch(yourVideos())}}>
      <SlideshowIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Your Videos</span>
     </div>
     </Link>
   </div>

   <div className="Ssecond" id='box'>
   <Link to='/' style={{textDecoration:"none",color:"white"}}>
   <div className="subscriptions" id='level' onClick={()=>{dispatch(subscribtionClicked())}}>
      <SubscriptionsIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Subscriptions</span>
     </div>
     </Link>
      
     <Link to="/" style={{textDecoration:"none",color:"white"}}>
     <div className="liked" id='level' onClick={()=>{dispatch(liked())}}>
      <ThumbUpAltIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Liked Videos</span>
     </div>
     </Link>

   </div>

   <div className="Sthird" id='box'>
   <Link to="/" style={{textDecoration:"none",color:"white"}}>
   <div className="top" id='level' onClick={()=>{dispatch(top())}}>
      <WhatshotIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Top Videos</span>
     </div>
     </Link>

     <Link to="/" style={{textDecoration:"none",color:"white"}}>
   <div className="gaming" id='level' onClick={()=>{dispatch(gaming())}}>
      <EmojiEventsIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Gaming</span>
     </div>
     </Link>

     <Link to="/" style={{textDecoration:"none",color:"white"}}>
     <div className="sports" id='level' onClick={()=>{dispatch(sports())}}>
      <SportsEsportsIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Sports</span>
     </div>
     </Link>
     
     <Link to="/" style={{textDecoration:"none",color:"white"}}>
     <div className="education" id='level' onClick={()=>{dispatch(education())}}>
      <SchoolIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Education</span>
     </div>
     </Link>
      
     <Link to="/" style={{textDecoration:"none",color:"white"}}>
     <div className="technology" id='level' onClick={()=>{dispatch(technology())}}>
      {/* <MemoryOutlinedIcon sx={{"color":"white","fontSize":"2.2rem"}}/> */}
      <MemoryOutlinedIcon sx={{"color":"white","fontSize":"2.2rem"}}/>
      <span>Technology</span>
     </div>
     </Link>

   </div>

   </div>
  )
}

export default Sidebar