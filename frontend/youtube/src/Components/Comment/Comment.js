import axios from 'axios';
import React from 'react'
import './Comment.css';
const Comment = ({profile_pic,username,desc,commentID}) => {


    const deleteComment=async()=>{
        try{
       const res=await axios.delete(`http://localhost:8000/api/comments/delete/${commentID}`,{withCredentials:true})
        }
        catch(err){
            if(err.response.staus==404){
               alert(err.response.data); 
            }

        }
    }

    const deleteCommentConfirmation=(e)=>{
        if(window.confirm("Are you sure you want to delete this comment")){
          deleteComment();
          e.preventDefault();
        }
      }

  return (
    <div className='comment'>
        <div className="first">
            <img src={profile_pic} alt="" className="userImage" />
        </div>
        <div className="second">
            <div className="userinfo">
                <span className="usernme">{username}</span>
                {/* <span className="time">2 days ago</span> */}
            </div>
            <div className="commentvalue">
               {desc}
            </div>
            <div className="delete" onClick={(e)=>{deleteCommentConfirmation(e)}}>
                Delete
            </div>
        </div>
    </div>
  )
}

export default Comment