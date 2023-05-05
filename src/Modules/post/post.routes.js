import express from 'express';
const router = express.Router()
import {AllPosts,AddPost,DeletePost,ChangePrivacy,LikePost,RemoveLike} from './post.controllers.js'
import {Validate} from '../../../Middleware/Validation/Validate.js'
import {AddPostVal,IdPostVal} from '../../../Middleware/Validation/Schema.validation.js'
import { CheckToken } from '../../../Middleware/Auth/Authorization.js';


//Home Page
router.get('/HomePage',CheckToken,AllPosts)
//Add Post
router.post('/AddPost',CheckToken,Validate(AddPostVal),AddPost)
//Delete Post
router.delete('/DeletePost',CheckToken,Validate(IdPostVal),DeletePost)
//Like A post
router.patch('/LikePost',CheckToken,Validate(IdPostVal),LikePost)
//Remove A Like
router.patch('/RemoveLike',CheckToken,Validate(IdPostVal),RemoveLike)
//Change Privacy
router.patch('/ChangePrivacy',CheckToken,Validate(IdPostVal),ChangePrivacy)


export default router;
