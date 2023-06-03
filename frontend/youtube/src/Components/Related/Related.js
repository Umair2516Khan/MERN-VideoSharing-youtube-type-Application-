import React from 'react'
import './Related.css';

const Related = ({username,image,title,views}) => {
  return (
           <div className='side-videocard'>
        <img src={image} alt="" className='thumbnail2'/>

        <div className="side-info">
        <span className="side-title">{title}</span>
        <span className='side-username'>{username}</span>
        <div className="side-views">
            <span className="video-views">{views} views </span>
            <span className="time-ago">10 days ago</span>
            </div>
        </div>
    </div>
  )
}

export default Related