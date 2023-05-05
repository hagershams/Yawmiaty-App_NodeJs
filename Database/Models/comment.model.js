import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    Content:String,
    From:{
        type:mongoose.Types.ObjectId,
        ref:"User"
        },
    OnPost:{
        type:mongoose.Types.ObjectId,
        ref:"Post"
    }
},{timestamps:true})
const CommentModel = mongoose.model("Comment",CommentSchema)
export default CommentModel;
