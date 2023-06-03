import user from '../models/User.js';
import video from '../models/Video.js';

//update user
export const updateUser=async(req,res)=>{
if(req.params.id===req.user.id){
    try{
   const updatedUser= await user.findByIdAndUpdate(req.params.id,{
    $set:req.body
   },{new:true})
   await updateUser.save();
   res.status(200).send("user updated");
}
catch(err){
    res.status(404).json(err);
}
}
else{
    res.status(404).send("You are not allowed to update this account. You can only update your account")
}
}

//delete user
export const deleteUser=async(req,res)=>{
if(req.params.id===req.user.id){
    try{
     await user.findByIdAndDelete(req.params.id);
     res.status(200).send("user has been deleted successfully");
    }
catch(err){
    res.status(404).json(err);
}
}
else{
    res.status(404).send("You are not allowed to delete this account. You can only delete your account")
}
}

//get information of a user
export const getUser=async(req,res)=>{
    try{
const userData=await user.findById(req.params.id);
const {password,...otherdata}=userData._doc;
res.status(200).send({...otherdata});
    }
    catch(err){
        res.status(404).json(err);
    }
}

//subscribe or unsubscribe a channel 
export const subscribeChannel=async(req,res)=>{
    if(req.params.id===req.user.id){
        res.status(404).send("user cannot subscribe his/her own channel");
    }
    else{
try{
    let flag1=0;
    const alreadySubscribed=await user.findById(req.user.id);
    alreadySubscribed.susbcribedTo.map((val)=>{
        if(val==req.params.id){
            flag1=1;
        }
    })
    if(flag1==0){
    await user.findByIdAndUpdate(req.user.id,{
        $push:{susbcribedTo:req.params.id}
    })
    await user.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:1}
    })
    res.status(200).send("channel subscribed successfully");
    // res.json(alreadySubscribed);

    }
    else{
        await user.findByIdAndUpdate(req.user.id,{
            $pull:{susbcribedTo:req.params.id}
        })
        await user.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        })
        res.status(200).send("channel unsubscribed successfully");
        // res.json(alreadySubscribed);
    }
}
catch(err){
    res.status(404).json(err.message);
}
    }
}

//get subscribed channels of user
export const subscribtions=async(req,res)=>{
    try{
        const userInfo=await user.findById(req.user.id);
        var subscriptionArray=[];
        // userInfo.susbcribedTo.forEach(async(val)=>{
            for (const val of userInfo.susbcribedTo){
            const data=await user.findById(val);
            subscriptionArray.push(data);
        }
        res.status(200).send(subscriptionArray);
        
    }
    catch(err){
        res.status(404).json(err.message);
    }
}

//check if the user has subscribed a particular video or not
export const isSubscribed=async(req,res)=>{
    try{
     const userData=await user.findById(req.user.id);
    const subscribedUsers = userData.susbcribedTo;
    const isSubscribed = subscribedUsers.includes(req.params.id);
            res.status(200).send(isSubscribed);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

//get all liked videos of the user
export const liked_videos_of_user=async(req,res)=>{
    try{
    //  let data=[];
     const user_data=await user.findById(req.user.id);
    const promises= user_data.likedVideos.map(async(val)=>{
         const video_data=await video.findById(val);
         return video_data;
     })
     const data=await Promise.all(promises)
     console.log(data);
     res.status(200).send(data);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}
