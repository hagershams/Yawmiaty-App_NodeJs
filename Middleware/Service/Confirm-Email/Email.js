import nodemailer from 'nodemailer';
import {EmailTemplate} from './Template.js'
export const ConfirmEmail =async(email,FirstName,token)=>{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"hagershams800@gmail.com",
            pass:"syhkpautowxmkaxp"
        }
    })

    let receiver = await transporter.sendMail({
        from:'"YAWMIATY👻"<hagershams800@gmail.com>',
        to:email,
        subject:"Confirm Email",
        html:EmailTemplate(FirstName,token)
    })
}