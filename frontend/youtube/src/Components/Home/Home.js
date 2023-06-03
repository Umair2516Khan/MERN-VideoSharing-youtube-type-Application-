import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import VideoSection from '../VideoSection/VideoSection';
import './Home.css';

const Home = () => {
  const location=useLocation();
  const stateData=location.state;
  if(stateData!==null){
    const tags=stateData.tags;
    const isClicked=stateData.isClicked;
  }
  // console.log(stateData.channelId);
  return (
    <>
        {/* <Navbar /> */}
         <div className="Bodyy">
          <div className="sidebarHome"><Sidebar/></div>
          {
            stateData?(<div className="videoSection"><VideoSection tags={stateData.tags} tagClicked={stateData.isClicked} 
              channelId={stateData.channelId} channelClicked={stateData.channelClicked}/></div>):(
              <div className="videoSection"><VideoSection tags="" tagClicked="false"/></div>
            )
          }
          </div>
    </> 
  )
}

export default Home