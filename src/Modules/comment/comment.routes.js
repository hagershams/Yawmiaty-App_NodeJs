import express from 'express';
const router = express.Router()
import {AddComment,DeleteComment} from './comment.controllers.js'
import {AddCommentSchemaVal,DeleteCommentSchemaVal} from '../../../Middleware/Validation/Schema.validation.js'
import {Validate} from '../../../Middleware/Validation/Validate.js'
import { CheckToken } from '../../../Middleware/Auth/Authorization.js';

//Add Comment
router.post('/AddComment',CheckToken,Validate(AddCommentSchemaVal),AddComment)
//Delete Comment
router.delete('/DeleteComment',CheckToken,Validate(DeleteCommentSchemaVal),DeleteComment)

export default router;
