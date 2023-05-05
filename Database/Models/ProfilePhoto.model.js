import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    By:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    Source:String
},{timestamps:true})
const ProfilePhotoModel = mongoose.model("ProfilePhoto",PhotoSchema)
export default ProfilePhotoModel;
