import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
const app = express()
let port = process.env.PORT||8000
import AppError from './Middleware/Error/AppError.js'
import{connection} from './Database/connection.js';
import UserRoutes from './src/Modules/user/user.routes.js'
import PostRoutes from './src/Modules/post/post.routes.js'
import CommentRoutes from './src/Modules/comment/comment.routes.js'



//Fire Connection
connection();

//Middleware
app.use(express.json())
app.use('Uploads',express.static('Uploads'))

//Routes
app.use('/api/v1/user',UserRoutes) //process.env.USER_ROUTE_URL
app.use('/api/v1/post',PostRoutes) //process.env.POST_ROUTE_URL
app.use('/api/v1/comment',CommentRoutes) //process.env.COMMENT_ROUTE_URL





//Dealing with Errors
app.use('*',(req,res,next)=>{
    next(new AppError(`Invalid Url ${req.originalUrl}`,404))
})
app.use((err,req,res,next)=>{
    console.log(err);
    let code = err.status || 500
    res.status(code).json({message:"Error from global"})
})
process.on("unhandledRejection",(err,req,res,next)=>{
    next(new AppError(`Error Connecting to Database`,404))
})
process.on("uncaughtException",(err,req,res,next)=>{
    console.log(err);
})


app.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`);
})