const mongoose=require("mongoose")

const winRatioSchema=mongoose.Schema({
    winRatio:{
        type:Number,
        default:0
    }
})

exports.WinRatioModel("winratio",winRatioSchema)