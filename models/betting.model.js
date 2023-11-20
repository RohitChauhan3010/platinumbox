const mongoose=require("mongoose");

const bettingSchema= mongoose.Schema({
    mninimumBet:{
        type:Number,
        required:true,
        default:1
    },
    maximumBet:{
        type:Number,
        required:true
    }
})


exports.BettingModel=mongoose.model("betting",bettingSchema)