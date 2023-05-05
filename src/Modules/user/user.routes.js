import express from 'express';
const router = express.Router()
import {SignUp,SignIn,ForgotPassword,ResetPassword,AllPosts,ProfilePage,AccountSettings_Name,AccountSettings_UserName,AccountSettings_Password,UploadProfilePhoto,LogOut, Verify} from './user.controllers.js'
import {Validate} from '../../../Middleware/Validation/Validate.js'
import {SignUpVal,SignInVal,ForgotPasswordVal,ResetPasswordVal,AccountSettingsVal} from '../../../Middleware/Validation/Schema.validation.js'
import { CheckToken,CheckTokenInParams } from '../../../Middleware/Auth/Authorization.js';
import {UploadPhoto} from '../../../Middleware/Utility/Photo.Uploader.js'

//Sign Up .. Confirm Email
router.post('/SignUp',Validate(SignUpVal),SignUp)
router.get('/Verify/:token',CheckTokenInParams,Verify)
//Sign In
router.post('/SignIn',Validate(SignInVal),SignIn)
//Forgot Password .. Reset Password
router.post('/ForgotPassword',Validate(ForgotPasswordVal),ForgotPassword)
router.post('/ResetPassword/:token',CheckTokenInParams,Validate(ResetPasswordVal),ResetPassword)
//Home Page
router.get('/HomePage',CheckToken,AllPosts)
//Profile Page
router.get('/ProfilePage',CheckToken,ProfilePage) //router.get('/ProfilePage',ProfilePage)
//Account Settings
router.patch('/AccountSettings/Name',CheckToken,Validate(AccountSettingsVal),AccountSettings_Name)
router.patch('/AccountSettings/UserName',CheckToken,Validate(AccountSettingsVal),AccountSettings_UserName)
router.patch('/AccountSettings/Password',CheckToken,Validate(AccountSettingsVal),AccountSettings_Password)

//Upload Profile Photo
router.post('/UploadProfilePhoto',CheckToken,UploadPhoto(),UploadProfilePhoto)
//Log Out
router.get('/LogOut',CheckToken,LogOut)

export default router;