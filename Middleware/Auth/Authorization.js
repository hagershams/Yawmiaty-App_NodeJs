import jwt from 'jsonwebtoken';

export const CreateToken = (user)=>{
    let {_id,Email} = user
    let token = jwt.sign({_id,Email},process.env.PRIVATE_KEY)
    return token
}
export const CheckToken =(req,res,next)=>{
    let authorization = req.headers['authorization']
    if (!authorization||authorization.startsWith('Bearer')==false){
        res.json({message:"No Sent Token"})
    }
    else{
        let token = authorization.split(" ")[1]
        jwt.verify(token,process.env.PRIVATE_KEY,(err,decoded)=>{
            if (err){
                res.json({message:"Invalid Token"})
            }
            else{
                req._id = decoded._id
                req.Email = decoded.Email
                next()
            }
        })
    }
}

export const CheckTokenInParams =async(req,res,next)=>{
    let {token} = req.params;
    jwt.verify(token,process.env.PRIVATE_KEY_EMAIL,(err,decoded)=>{
        if (err){
            console.log(err);
            res.json({message:"Invalid"})
        }
        else{
            req.Email = decoded
            next()
        }
    })
}