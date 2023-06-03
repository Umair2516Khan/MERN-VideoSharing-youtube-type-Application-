import React, { useRef } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar';
import VideoSection from './Components/VideoSection/VideoSection';
import VideoDisplay from './Components/VideoDisplay/VideoDisplay';
import './App.css';
import Home from './Components/Home/Home';
import {Link,Route,Routes} from 'react-router-dom';
import Signin from './Components/Signin/Signin';
import Auth from './Components/Auth/Auth';
import CreateVideo from './Components/CreateVideo/CreateVideo';

const App = () => {

  return (
    <div className='app'>
      <Navbar />
      <Auth />
      <CreateVideo />
      {/* <Signin /> */}
  <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/video' element={<VideoDisplay />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
        </Routes>
    </div>
  )
}

export default App