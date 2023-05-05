import mongoose from "mongoose"

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
    ProfilePhoto:{
        type:mongoose.Types.ObjectId,
        ref:"ProfilePhoto"
    }
    ,Posts:[{
        type:mongoose.Types.ObjectId,
        ref:"Post"
    }]
},{timestamps:true})
 
const UserModel = mongoose.model("User",UserSchema)
export default UserModel;