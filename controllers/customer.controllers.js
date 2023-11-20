const { handleErrors } = require("../errorHandling/errorHandlers")
const { CustomerModel } = require("../models/customers.model")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { username, email, password, isActive, walletBalance } = req.body;

        const existingUsers = await CustomerModel.findOne({ email });
        if (existingUsers) {
            return res.status(401).json({
                status: false,
                msg: "users alreday registered. Please login."
            })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new CustomerModel({
            username,
            email,
            password: hashedPassword,
            isActive,
            walletBalance
        })

        await newUser.save()
        return res.status(201).json({
            status: true,
            msg: "users register sucessfully!. Go to login page.",
            userDetails: newUser
        })

    } catch (error) {
        handleErrors(error, req, res)//
        //console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await CustomerModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                status: false,
                msg: "User not found",
            });
        }

        if (!existingUser.isActive) {
            return res.status(404).json({
                status: false,
                msg: "Your account has been deactivated",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: false,
                msg: "Incorrect password",
            });
        }

        const token= jwt.sign({userId:existingUser._id},"secret", {expiresIn:"3h"})
        console.log("hello", token)
        return res.status(201).json({
            status:true,
            msg:"Login Successfull!",
            token,
            userDetails:existingUser
        })
    } catch (error) {
        handleErrors(error, req, res);
    }
};



const forget = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUser = await CustomerModel.findOne({ email });
        if (!checkUser) {
            return res.status(401).json({
                status: false,
                msg: "User not found",
            });
        }

        // Instead of generating a recovery token, directly proceed to password reset
        return res.status(201).json({
            status: true,
            msg: "User found. Proceed to reset password.",
            userId: checkUser._id,
        });
    } catch (error) {
        handleErrors(error, req, res);
    }
};


const forgetPassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { password } = req.body;

        console.log("UserID:", userId);
        console.log("Password:", password);

        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        const updatedUser = await CustomerModel.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                status: false,
                msg: "User not found or unable to update password",
            });
        }

        console.log("Updated User:", updatedUser);

        return res.status(201).json({
            status: true,
            msg: "Password updated successfully",
            updatedUser,
        });
    } catch (error) {
        console.error("Error updating password:", error);
        handleErrors(error, req, res);
    }
};

module.exports = {
    register,
    login,
    forget,
    forgetPassword
}