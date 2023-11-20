const mongoose=require("mongoose")

const customerSchema= mongoose.Schema({
    username:{
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
        required:true,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    walletBalance:{
        type:Number,
        default:0
    }
})

const CustomerModel=mongoose.model("customer",customerSchema)

module.exports={
    CustomerModel
}