const mongoose=require("mongoose")

const userLiveTrackingSchema= mongoose.Schema({
    gameId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"game"
    },
    totalPlayers:{
        type:Number,
        required:true,
    },
    betsPerSlot:[{
        slotIndex:{
            type:Number,
            required:true
        },
        numberofBets:{
            type:Number,
            required:true
        }
    }],

    latestPlayer:{
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"customer",
            required:true       
        },
        walletBalance:{
            type:Number,
            required:true,
        },
        betAmount:{
            type:Number,
            required:true
        }
    }
    
})



exports.UserLiveTrackingModel=mongoose.model("userLiveTracking",userLiveTrackingSchema)
