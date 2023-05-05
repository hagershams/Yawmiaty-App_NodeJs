import multer from "multer";
import { nanoid } from "nanoid";

export const UploadPhoto =()=>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"Uploads")
        },
        filename:(req,file,cb)=>{
            cb(null,nanoid()+"_"+file.originalname)
        }
    })

    const filter =(req,file,cb)=>{
        if(file.mimetype.StartsWith("image")){
            cb(null,true)
        }
        else{
            cb(null,false)
        }
    }
    const upload = multer({storage:storage,filter})
    return upload.single("ProfilePhoto")
}