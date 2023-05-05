import UserModel from '../../../Database/Models/user.model.js'
import PostModel from '../../../Database/Models/post.model.js'
import HandleError from '../../../Middleware/Error/Error.Handler.js'

export const AllPosts= HandleError(async(req,res,next)=>{
    let Posts = await PostModel.find()
    res.status(202).json({message:"Welcome to Home Page :",Posts})
})

export const AddPost= HandleError(async(req,res,next)=>{
    let {Title,Text}=req.body
    await PostModel.insertMany({Title,Text,From:req._id})
    let {Posts} = await UserModel.findById(req._id).populate("Posts")
    res.status(201).json({message:"Post Added Successfully",Posts})
})

export const DeletePost= HandleError(async(req,res,next)=>{
    let {_id}=req.body
    let post = await PostModel.findByIdAndDelete(_id)
    if(!post) return res.status(404).json({message:"Post Not Found .. Check Post Id"})
    res.status(202).json({message:"Post Deleted Successfully"})
})

export const LikePost= HandleError(async(req,res,next)=>{
    let {_id}=req.body
    let post = await PostModel.findByIdAndUpdate(_id,{$addToSet:{Likes:req._id}},{new:true}).where({Privacy:false})
    if(!post) return res.status(404).json({message:"Post Is Private Or Not Found .. Check Post Id"})
    res.status(201).json({message:"Like Added Successfully",post})            
})

export const RemoveLike= HandleError(async(req,res,next)=>{
    let {_id}=req.body
    let post = await PostModel.findByIdAndUpdate(_id,{$pull:{Likes:req._id}},{new:true})
    if(!post) return res.status(404).json({message:"Post Not Found .. Check Post Id"})
    res.status(202).json({message:"Like Removed Successfully",post})
})

export const ChangePrivacy= HandleError(async(req,res,next)=>{
    let {_id}=req.body
    let post = await PostModel.findByIdAndUpdate(_id,{Privacy:true})
    if(!post) return res.status(404).json({message:"Post Not Found .. Check Post Id"})
    res.status(202).json({message:"Privacy State Changed To Be 'Only Me' Successfully"})
})