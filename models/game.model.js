const mongoose=require("mongoose")

const gameSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slots:[{
        logo:{
            type:String,
            required:true
        },
        winningSlot:{
            type:String,
            required:true
        }
    }],
    started:{
        type:Boolean,
        default:false,
    },
    startTime:{
        type:Date
    },
    endTime:{
        type:Date
    }
})


exports.GameModel=mongoose.model("game",gameSchema)