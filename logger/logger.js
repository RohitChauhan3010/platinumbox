const winston = require("winston")
const DailyRotateFile = require("winston-daily-rotate-file")
const fs=require("fs")
const logger = winston.createLogger({
    transports: [],
})

const logError = (error, req) => {
    const logFileName = `logger/Error`;


    fs.readdirSync("logger").forEach((file) => {
        if (file.startsWith("error-") && file.endsWith(".log")) {
            fs.unlinkSync(`logger/${file}`);
        }
    });

    const errorLog = new DailyRotateFile({
        filename: logFileName,
        datePattern: "DD-MM-YYYY",
        zippedArchive: true,
        maxSize: "20m",
        level: "error",
        format: winston.format.combine(
            winston.format.timestamp({
                format: "DD-MM-YYYY HH:mm:ss",
            }),
            winston.format.errors({
                stack: true
            }),
            winston.format.splat(),
            winston.format.json()
        ),
    })

    logger.clear()
    logger.add(errorLog)
    logger.error({
        messae: `Error:${error.message}, Request:${req.originalUrl}`
    })
}

module.exports = {
    logError
} 
