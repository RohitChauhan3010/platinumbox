const mongoose=require("mongoose")

const gameHistorySchema=mongoose.Schema({
    gameId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"game",
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    winningSlotIndex:{
        type:Number,
        required:true,
    }
})

exports.GameHistoryModel=mongoose.model("gameHistory",gameHistorySchema)
