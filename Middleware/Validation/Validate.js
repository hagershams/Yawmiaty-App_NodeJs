
export const Validate =(Schema)=>{
    return(req,res,next)=>{
        let{error}= Schema.validate(req.body,{abrotEarly:false})
        if(error){
            res.json({message:"Not Valied Database",error})
        }
        else{
            next()
        }
    }
}