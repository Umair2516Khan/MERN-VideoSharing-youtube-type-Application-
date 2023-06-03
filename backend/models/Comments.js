import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
userId:{
    type:String,
    requred:true
},
videoId:{
    type:String,
    required:true
},
desc:{
    type:String,
    required:true
},
username:{
    type:String,
},
user_pic:{
    type:String,
}
},{timestamps:true})

export default mongoose.model("comments",commentSchema)