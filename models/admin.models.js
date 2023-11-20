const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:[{
        enum:["admin","staff"],
        default:"staff",
        required:true
    }],
    isActive:{
        type:Boolean,
        default:true
    }
})


exports.AdminModel=("admin",adminSchema)