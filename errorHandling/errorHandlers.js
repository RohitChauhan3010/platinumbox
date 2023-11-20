const {logError}=require("../logger/logger")

exports.handleErrors=(error,req,res,next)=>{
    logError(error,req);
    return res.status(500).json({
        error:{
            message:error.message
        }
    })
}

