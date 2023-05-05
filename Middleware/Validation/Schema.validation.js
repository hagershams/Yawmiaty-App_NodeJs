import joi from 'joi';

export const SignUpVal = joi.object({
    FirstName: joi.string().required().alphanum().min(2).max(30),
    LastName: joi.string().required().alphanum().min(2).max(30),
    UserName: joi.string().required().alphanum().min(2).max(30),
    Email: joi.string().email().required(),
    Password: joi.string().pattern(/^[A-Z][a-z0-9]{3,10}$/).required()
})

export const SignInVal = joi.object({
    Email: joi.string().email().allow({minDomainSegments:2}).required(),
    Password: joi.string().pattern(/^[A-Z][a-z0-9]{3,10}$/).required()
})


export const ForgotPasswordVal = joi.object({
    Email: joi.string().required().email()
})


export const ResetPasswordVal = joi.object({
    NewPassword:joi.string().pattern(/^[A-Z][a-z0-9]{7,30}$/).required(),
    RePassword:joi.ref('NewPassword'),
    ResetCode:joi.string().required()
})


export const AccountSettingsVal = joi.object({
    Password: joi.string().pattern(/^[A-Z][a-z0-9]{3,10}$/).required(),
    NewPassword:joi.string().pattern(/^[A-Z][a-z0-9]{3,10}$/),
    RePassword:joi.ref('NewPassword'),
    FirstName: joi.string().alphanum().min(2).max(30),
    LastName: joi.string().alphanum().min(2).max(30),
    UserName: joi.string().alphanum().min(2).max(30)
})

export const AddPostVal = joi.object({
    Title: joi.string().required().min(2).max(40),
    Text: joi.string().max(300)
})

export const IdPostVal = joi.object({
    _id: joi.string().required().hex().length(24)
})



export const AddCommentSchemaVal = joi.object({
    Content: joi.string().required(),
    OnPost: joi.string().required().hex().length(24)
})

export const DeleteCommentSchemaVal = joi.object({
    _id: joi.string().required().hex().length(24)
})