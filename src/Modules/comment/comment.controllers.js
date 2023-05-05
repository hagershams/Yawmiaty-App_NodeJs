import CommentModel from '../../../Database/Models/comment.model.js'
import PostModel from '../../../Database/Models/post.model.js'
import HandleError from '../../../Middleware/Error/Error.Handler.js'

export const AddComment= HandleError(async(req,res,next)=>{
    let {Content,OnPost}=req.body
    await CommentModel.insertMany({Content,OnPost,From:req._id})
    res.status(201).json({message:"Comment Added Successfully"})
})

export const DeleteComment= HandleError(async(req,res,next)=>{
    let {_id}=req.body
    let UserId = req._id
    let comment = await CommentModel.findById(_id)
    if(!comment) return res.status(404).json({message:"Comment Not Exist .. Check Id"})
    console.log(comment);
    if (comment.From != UserId) return res.status(401).json({message:"Cannot Delete As It's Not Your Comment"})
    await CommentModel.findByIdAndDelete(_id)
    res.status(202).json({message:"Comment Deleted Successfully"})
})
