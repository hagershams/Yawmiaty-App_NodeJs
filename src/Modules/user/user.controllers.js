import UserModel from '../../../Database/Models/user.model.js'
import ProfilePhotoModel from '../../../Database/Models/user.model.js'
import HandleError from '../../../Middleware/Error/Error.Handler.js'
import {ConfirmEmail} from '../../../Middleware/Service/Confirm-Email/Email.js'
import {ResetPasswordEmail} from '../../../Middleware/Service/Reset-Password/Email.js'
import {CreateToken} from '../../../Middleware/Auth/Authorization.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';


export const SignUp= HandleError(async(req,res,next)=>{
    let{FirstName,LastName,UserName,Email,Password}=req.body;
    let founded = await UserModel.findOne({Email})
    if(founded) return res.status(406).json({message:"User Email Already Exist"})
    let hashedPassword = bcrypt.hashSync(Password,Number(process.env.SALT_ROUND))
    let token = jwt.sign(Email,process.env.PRIVATE_KEY_EMAIL)
    await UserModel.insertMany({FirstName,LastName,UserName,Email,Password:hashedPassword,ResetCode:token})
    ConfirmEmail(Email,FirstName,token)
    res.status(201).json({message:`Welcome ${FirstName}`})
})
export const Verify =HandleError( async(req,res,next)=>{
    let hh= await UserModel.find()
    console.log(hh)
    console.log(req.Email);
    let user = await UserModel.findOneAndUpdate({Email:req.Email},{ConfirmedEmail:true})
    console.log(user);
    if(!user) return res.status(203).json({message:"Verification Not Done"})
    res.status(406).json({message:"Verification Done .. You can Login now"})
})
export const SignIn= HandleError(async(req,res,next)=>{
    let{Email,Password}=req.body;
    let user = await UserModel.findOne({Email})
    if(!user) return res.status(406).json({message:"Email Not Found .. Register First"})
    let check = bcrypt.compareSync(Password,user.Password)
    if(!check) return res.status(403).json({message:"Password is Wrong .. Try Again"})
    await UserModel.findOneAndUpdate({Email,IsLogged:true})
    console.log(user);
    let token = CreateToken(user);
    res.status(202).json({message:`Welcome ${user.FirstName}:` , message:"Your Token :",token})
})
export const ForgotPassword= HandleError(async(req,res,next)=>{
    let{Email}=req.body;
    let user = await UserModel.findOne({Email})
    if(!user) return res.status(406).json({message:"Email Not Found .. Register First"})
    let token = jwt.sign(Email,process.env.PRIVATE_KEY_EMAIL)
    ResetPasswordEmail(Email,user.ResetCode,token)
    res.status(202).json({message:"Visit Your Email To Reset The Password!"})
})
export const ResetPassword= HandleError(async(req,res,next)=>{
    let{NewPassword,ResetCode}=req.body; 
    let Email = req.Email   
    let user = await UserModel.findOne({Email:req.Email})
    if(!user) return res.status(406).json({message:"Email Not Found .. Register First"})
    if(user.ResetCode !== ResetCode) return res.status(406).json({message:"Reset Code is Not Correct!"})
    let hashedPassword= bcrypt.hashSync(NewPassword,Number(process.env.SALT_ROUND))
    let code = jwt.sign(Email,process.env.PRIVATE_KEY_EMAIL)
    user.Password=hashedPassword;
    user.IsLogged=true;
    user.ResetCode=code;
    user.save()
    let token = CreateToken(user);
    res.status(202).json({message:`Welcome ${user.FirstName}:` , message:"Your Token :",token})
})

export const AllPosts= HandleError(async(req,res,next)=>{
    let user = await UserModel.find().where({IsLogged:true}).populate("Posts").select('Posts')
    if(!user) return res.status(406).json({message:"Session Expired .. Log In Again"})
    let {Posts} = user
    res.status(202).json({message:"Welcome to Home Page :",Posts})
})

export const ProfilePage= HandleError(async(req,res,next)=>{
    let user = await UserModel.findById(req._id).where({IsLogged:true}).populate("Posts")
    if(!user) return res.status(406).json({message:"Session Expired .. Log In Again"})
    res.status(202).json({message:"Profile Page :",user})
})

export const AccountSettings_Name= HandleError(async(req,res,next)=>{
    let{FirstName,LastName,Password}=req.body
    let user = await UserModel.findById(req._id).where({IsLogged:true})
    if(!user) return res.status(406).json({message:"Session Expired .. Log In Again"})
    let check = bcrypt.compareSync(Password,user.Password)
    if(!check) return res.status(406).json({message:"Password is wrong .. Enter The Correct Password To Change The Name"})
    user.FirstName =FirstName
    user.LastName =LastName
    user.save()
    res.status(202).json({message:"Name Changed Successfully :",user})
})
export const AccountSettings_Password= HandleError(async(req,res,next)=>{
    let{Password,NewPassword}=req.body
    let user = await UserModel.findById(req._id).where({IsLogged:true})
    if(!user) return res.status(406).json({message:"Session Expired .. Log In Again"})
    let check = bcrypt.compareSync(Password,user.Password)
    if(!check) return res.status(406).json({message:"Password is wrong .. Enter The Correct Password To Be Able To Change"})
    let hashedPassword = bcrypt.hashSync(NewPassword,Number(process.env.SALT_ROUND))
    user.Password =hashedPassword
    user.save()
    res.status(202).json({message:"Password Changed Successfully :"})
})
export const AccountSettings_UserName= HandleError(async(req,res,next)=>{
    let{UserName,Password}=req.body
    let user = await UserModel.findById(req._id).where({IsLogged:true})
    if(!user) return res.status(406).json({message:"Session Expired .. Log In Again"})
    let check = bcrypt.compareSync(Password,user.Password)
    if(!check) return res.status(406).json({message:"Password is wrong .. Enter The Correct Password To Be Able To Change"})
    user.UserName =UserName
    user.save()
    res.status(202).json({message:"UserName Changed Successfully :",user})
})

export const LogOut= HandleError(async(req,res,next)=>{
    await UserModel.findByIdAndUpdate(req._id,{IsLogged:false})
    res.status(202).json({message:" Logged Out"})
})



export const UploadProfilePhoto= HandleError(async(req,res,next)=>{
    let image = req.file;
    if(!image) return res.status(403).json({message:"Upload Images Only"})
    let added = await ProfilePhotoModel.insertMany({Source:image.filename,By:req._id})
    await UserModel.findByIdAndUpdate(req._id,{ProfilePhoto:added})
    res.status(202).json({message:"Profile Picture Added Successfully"})
})