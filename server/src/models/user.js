const mongoose = require('mongoose');


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
},{timestamps:true});
const userModel=mongoose.model("Users",userSchema);

module.exports=userModel;