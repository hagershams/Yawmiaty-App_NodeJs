import mongoose from "mongoose";
//Photo Model
const PhotoSchema = new mongoose.Schema({
    Source:String,
    By:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
export const ProfilePhotoModel = mongoose.model("ProfilePhoto",PhotoSchema)


//Comment Model
const CommentSchema = new mongoose.Schema({
    Content:String,
    From:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    PostId:{
        type:mongoose.Types.ObjectId,
        ref:"Post"
    }
},{timestamps:true})
export const CommentModel = mongoose.model("Comment",CommentSchema)


//Post Model
const PostSchema = new mongoose.Schema({
    Title:String,
    Text:String,
    Privacy:{
        type:Boolean,
        default:false //False : "Friends"  ...  True : "Only Me"
    },
    Likes:[
        {   type:mongoose.Types.ObjectId,
            ref:"User"
        }],
    Comments:[CommentSchema],
    By:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
export const PostModel = mongoose.model("Post",PostSchema)

//User Model
const UserSchema = new mongoose.Schema({
    FirstName:String,
    LastName:String,
    UserName:String,
    Email:String,
    Password:String,
    ConfirmedEmail:{
        type:Boolean,
        default:false
    },
    IsLogged:{
        type:Boolean,
        default:false
    },
    ResetCode:String,
    ProfilePhoto:[PhotoSchema]
    ,/*Posts:[{
        type:mongoose.Types.Subdocument,
        ref:"Post"
    }]*/
    Posts:[PostSchema]
},{timestamps:true})
 
export const UserModel = mongoose.model("User",UserSchema)

//export default UserModel;