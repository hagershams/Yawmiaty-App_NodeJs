import mongoose from "mongoose";

export const connection =()=>{
    mongoose.set("strictQuery",true)
    mongoose.connect(process.env.DATABASE_URL)//mongodb://127.0.0.1:27017/ExamProject
    .then(console.log("Connected To Database ... "))
    .catch((err)=>{
        console.log(err);
    })
}