const mongoose=require("mongoose")

const financialSchema=mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    select: {
        type: String,
        enum: ['deposit', 'withdrawal'],
        required:true
    },
    timestamp:{
        type:Date,
        Default:Date.now
    }
})


exports.FinancialModel=mongoose.model("financial",financialSchema)