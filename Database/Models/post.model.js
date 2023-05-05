import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    Title:String,
    Text:String,
    Privacy:{
        type:Boolean,
        default:false //False : "Friends"  ...  True : "Only Me"
    },
    From:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    Likes:[
        {   type:mongoose.Types.ObjectId,
            ref:"User"
        }],
    omments:[
        {   type:mongoose.Types.ObjectId,
            ref:"Comment"
        }]
},{timestamps:true})
 
const PostModel = mongoose.model("Post",PostSchema)
export default PostModel;
