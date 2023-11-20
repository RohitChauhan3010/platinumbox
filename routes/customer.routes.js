const express=require("express");
const {register, login, forget, forgetPassword}=require("../controllers/customer.controllers")

const customerRoute=express.Router();

customerRoute.post("/register",register)
customerRoute.post("/login",login)
customerRoute.post("/forget",forget)   // first step to check the users exists or not 
customerRoute.put("/forgetPassword/:userId", forgetPassword) // second step to forget password

module.exports={
    customerRoute
}