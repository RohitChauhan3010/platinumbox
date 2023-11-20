const mongoose=require("mongoose")

const walletSchema=mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required:true
    },
    walletBalance:{
        type:Number,
        default:0
    }
})

exports.WalletModel("wallet",walletSchema)