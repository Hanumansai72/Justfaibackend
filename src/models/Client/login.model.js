const mongoose=require("mongoose")

const ClientSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true  }

},{timestamps:true})
module.exports=mongoose.model("Client",ClientSchema)
