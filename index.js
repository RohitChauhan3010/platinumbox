const express=require("express");
const {connection}  = require("./config/db");
const PORT=process.env.port;
const {handleErrors}=require("./errorHandling/errorHandlers");
const {customerRoute}  = require("./routes/customer.routes");
const app=express();

app.use(express.json());


app.get("/",(req,res)=>{
    const data=[{
        name:"rohit"
    }]
    res.status(201).json({
        status:true,
        msg:"welcome to homepage!",
        data:data
    })
})

app.use((err,req,res,next)=>{
    handleErrors(err,req,res,next)
})

app.use("/customer",customerRoute)

app.listen(PORT, async(req, res)=>{
    try {
        await connection
        console.log("Database connected!")
    } catch (error) {
        console.log("Database not connected!")
        console.error(`Database connection error: ${error.message}`)
    }
    console.log(`Server is  running on port: ${PORT}`)
})