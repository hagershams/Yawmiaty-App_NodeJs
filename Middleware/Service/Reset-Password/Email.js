import nodemailer from 'nodemailer';
import {EmailTemplate} from './Template.js'
export const ResetPasswordEmail =async(email,ResetCode,token)=>{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"hagershams800@gmail.com",
            pass:"syhkpautowxmkaxp"
        }
    })

    let receiver = await transporter.sendMail({
        from:"hagershams800@gmail.com",
        to:email,
        subject:"Reset Password Email",
        html:EmailTemplate(ResetCode,token)
    })
}