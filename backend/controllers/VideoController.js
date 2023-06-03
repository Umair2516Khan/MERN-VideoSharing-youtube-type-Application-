import video from '../models/Video.js';
import user from '../models/User.js';
import { request } from 'express';
import comments from '../models/Comments.js';

//create a new video
export const createVideo=async(req,res)=>{
    try{
    const userData=await user.findById(req.user.id);
    const user_name=userData.name;
    const picU=userData.image;
    // console.log(picU);
     const newVideo = new video({...req.body,userId:req.user.id,user_pic:picU,username:user_name})
     await newVideo.save();
     res.status(200).send(newVideo);
    }
    catch(err){
      res.status(404).json(err);
    }
}

//update a video
export const updateVideo=async(req,res)=>{
const videoInfo=await video.findById(req.params.id);
if(videoInfo.userId===req.user.id){
try{
const updateVideo=await video.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true})
res.status(200).send("video updated successfully");
}
catch(err){
res.status(404).json(err.message);
}
}
else{
    res.status(404).send("you can update only your own video!!");
}
}

// delete a video
export const delete_a_Video=async(req,res)=>{
try{
    const videoInfo=await video.findById(req.params.id);
    if(videoInfo.userId===req.user.id){

        //these 2 updateMany and 1 deleteMany works just like on cascade delete in sql
        await user?.updateMany(
            { likedVideos: videoInfo._id },
            { $pull: { likedVideos: videoInfo._id } }
          );
          await user?.updateMany(
            { dislikedVideos: videoInfo._id },
            { $pull: { dislikedVideos: videoInfo._id } }
          );
          await comments?.deleteMany(
            {videoId: videoInfo._id},
          );

        await videoInfo.remove();
        res.status(200).send("video deleted")
    }
    else{
        res.status(404).send("error");
    }
}
catch(err){
    res.status(404).send(err.message);
}
}

//get a video
export const getVideo=async(req,res)=>{
    try{
    const videoInfo=await video.findById(req.params.id);
    if(videoInfo){
        res.status(200).send(videoInfo);
    }
    else{
        res.status(404).send("no such video exists");
    }
    }
    catch(err){
    res.status(404).send(err.message)
    }
}

//check if the user has disliked a particular video or not
export const isLiked=async(req,res)=>{
    try{
     const userData=await user.findById(req.user.id);
    const likedVideos = userData.likedVideos;
    const isLiked = likedVideos.includes(req.params.videoid);
            res.status(200).send(isLiked);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

//check if the user has disliked a particular video or not
export const isdisLiked=async(req,res)=>{
    try{
     const userData=await user.findById(req.user.id);
    const dislikedVideos = userData.dislikedVideos;
    const disLiked = dislikedVideos.includes(req.params.videoid);
            res.status(200).send(disLiked);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

//views increase 
export const viewIncrease=async(req,res)=>{
 try{
    const videoInfo=await video.findById(req.params.id);
    if(videoInfo){
        await videoInfo.update({
            $inc:{views:1}
        },{new:true})
        res.status(200).send(videoInfo);
    }
    else{
        res.status(404).send("no such video exists");
    }
    } 
 catch(err){
    res.status(404).json(err.message);
 }
}

//get videos of subscribed users
export const getSubscribedVideo=async(req,res)=>{
    try{
    //     let videoArray=[];
      const userInfo=await user.findById(req.user.id);
    // const values= userInfo.susbcribedTo.map(async(userid)=>{
    //      const videosInfo=await video.find({userId:userid});
    //     videosInfo.map((val)=>{ 
    //         return val.title;
    //      })

    //     }
    //   )
    // const videoss=await Promise.all(values);
    // console.log(videoss);
    //   res.status(200).send(videoss);
    const videoss=await Promise.all(
        userInfo.susbcribedTo.map((subscribedUserid)=>{
           return video.find({userId:subscribedUserid});
        })
    )
    let videoTitles=[];
    videoss.forEach((val)=>{
        videoTitles.push(val[0].title);
        // console.log(val[0].title);
    })
    // res.status(200).send(videoTitles);
    res.status(200).send(videoss.flat().sort((a,b)=>{
        return b.createdAt-a.createdAt
    }));
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

//get top/trending videos
export const topVideos=async(req,res)=>{
    try{
        //in mongodb sort() method we use -1 for descendingg and 1 for ascending order
       const topVideo=await video.find().sort({views:-1});
       res.status(200).send(topVideo);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

//get random videos
export const randomVideos=async(req,res)=>{
    try{
     const randomVideo=await video.aggregate([{$sample:{size:8}}]);
    res.status(200).send(randomVideo);
    }
    catch(err){
        res.status(404).json(err.message);
    }
}

//search by title
export const searchByTittle=async(req,res)=>{
    try{
        const query=req.query.title;
     const video_by_title=await video.find({title:{$regex:query,$options:"i"}}).limit(5);
     if(video_by_title){
        res.status(200).send(video_by_title);
     }
     else{
        res.status(404).send("no video exists with such title");
     }
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

//get videos by tags
export const getTags=async(req,res)=>{
    try{
        // console.log(req.body.tags);
        let videoByTags=[];
    //   for(let i=0;i<req.body.tags.length;i++){
       const videos= await video.find({tags:{$in:req.body.tags}}).limit(15);
    //    videoByTags.push(videoo);
    //   }
      res.status(200).send(videos);
       
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

//get videos by channel name
export const getVideosByChannel=async(req,res)=>{
try{
const videos=await video.find({userId:{$in:req.params.id}});
res.status(200).send(videos.flat().sort((a,b)=>{
    return b.createdAt-a.createdAt
}));
}
catch(err){
    res.status(404).send(err.message);
}
}

//Like a video
export const like_a_Video=async(req,res)=>{
    try{
        const user_info=await user.findById(req.user.id);
        let flag=0;
        user_info.likedVideos?.forEach((val)=>{
            if(val===req.params.videoid){
                flag=1;
            }
        })
        user_info.dislikedVideos?.forEach((val)=>{
            if(val===req.params.videoid){
                flag=2;
            }
        })

//decreasing the number of dislikes and increasing the number of likes if the video which was disliked and was liked by the user 
        if(flag===2){
            await video.findByIdAndUpdate(req.params.videoid,{
                $inc:{no_of_likes:1,no_of_dislikes:-1},
                // $inc:{no_of_dislikes:-1},
            })
            await user.findByIdAndUpdate(req.user.id,{
                $push:{likedVideos:req.params.videoid},
                $pull:{dislikedVideos:req.params.videoid}
             })
             res.status(200).send("video liked successfully");
        }

//decreasing the number of likes if a video which was already liked is liked again by the user
        if(flag===1){
            await video.findByIdAndUpdate(req.params.videoid,{
                $inc:{no_of_likes:-1},
            })
            await user.findByIdAndUpdate(req.user.id,{
                $pull:{likedVideos:req.params.videoid},
             })
             res.status(200).send("video liked successfully");
        }
//if the video was neither liked nor disliked was liked by the user
        if(flag===0){
     await video.findByIdAndUpdate(req.params.videoid,{
        $inc:{no_of_likes:1}
     });
     await user.findByIdAndUpdate(req.user.id,{
        $push:{likedVideos:req.params.videoid},
     })
     res.status(200).send("video liked successfully");
    }
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

//dislike a video
export const dislike_a_Video=async(req,res)=>{
    try{
        const user_info=await user.findById(req.user.id);
        let flag=0;
        user_info.dislikedVideos?.forEach((val)=>{
            if(val===req.params.videoid){
                flag=1;
            }
        })
        user_info.likedVideos?.forEach((val)=>{
            if(val===req.params.videoid){
                flag=2;
            }
        })

//decreasing the number of likes and increasing the number of dislikes if the video which was already liked and was disliked by the user 
        if(flag===2){
            await video.findByIdAndUpdate(req.params.videoid,{
                $inc:{no_of_dislikes:1,no_of_likes:-1},
                // $inc:{no_of_likes:-1},
            })
            await user.findByIdAndUpdate(req.user.id,{
                $push:{dislikedVideos:req.params.videoid},
                $pull:{likedVideos:req.params.videoid}
             })
             res.status(200).send("video disliked successfully");
        }

//decreasing the number of dislikes if a video which was already disliked is disliked again by the user
        if(flag===1){
            await video.findByIdAndUpdate(req.params.videoid,{
                $inc:{no_of_dislikes:-1},
            })
            await user.findByIdAndUpdate(req.user.id,{
                $pull:{dislikedVideos:req.params.videoid},
             })
             res.status(200).send("video disliked successfully");
        }
//if the video was neither liked nor disliked was disliked by the user
        if(flag===0){
     await video.findByIdAndUpdate(req.params.videoid,{
        $inc:{no_of_dislikes:1}
     });
     await user.findByIdAndUpdate(req.user.id,{
        $push:{dislikedVideos:req.params.videoid},
     })
     res.status(200).send("video disliked successfully");
    }
    }
    catch(err){
        res.status(404).send(err.message);
    }
}