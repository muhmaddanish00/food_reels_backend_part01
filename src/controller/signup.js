import User from "../models/user.model.js";
import FoodPartner from "../models/foodpartner.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
async function signUpController(req, res){

    const { userName, email, password } = req.body || {};

    try{
        const isUserExist = await User.findOne({ email });

        if(isUserExist){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword,

        })

        const token = jwt.sign({
            id:newUser._id,
        }, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.cookie("token", token);
        res.status(201).json({
            message:"User created successfully",
            user:{
                _id:newUser._id,
                email:newUser.email,
                userName:newUser.userName

            }
        })
    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}

export default signUpController

export async function loginController(req, res){
    const { email, password } = req.body || {};
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        const token =  jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.cookie("token", token);
        res.status(200).json({
            message:"user logged in successfully",
            user:{
                _id:user._id,
                email:user.email,
                userName:user.userName
            }
        })


    }catch(error){
        return res.status(500).json({
            message:"internal server error"
        })
    }
    
}

export async function logoutController(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message:"user logged out successfully"
    });
}

export async function foodPartnerSignUpController(req, res){

    const { userName, email, password } = req.body;
    console.log(req.body)

    try{
        const isFoodPartnerExist = await FoodPartner.findOne({ email });

        if(isFoodPartnerExist){
            return res.status(400).json({message:"foodPartner already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newFoodPartner = await FoodPartner.create({
            userName,
            email,
            password: hashedPassword,

        })

        const token = jwt.sign({
            id:newFoodPartner._id,
        }, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.cookie("token", token);
        res.status(201).json({
            message:"FoodPartner created successfully",
            user:{
                _id:newFoodPartner._id,
                email:newFoodPartner.email,
                userName:newFoodPartner.userName
            }
        })
    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}


export async function foodPartnerloginController(req, res){
    const { email, password } = req.body || {};
    try{
        const foodPartner = await FoodPartner.findOne({ email });
        if(!foodPartner){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        const token =  jwt.sign(
            {id:foodPartner._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.cookie("token", token);
        res.status(200).json({
            message:"user logged in successfully",
            user:{
                _id:foodPartner._id,
                email:foodPartner.email,
                userName:foodPartner.userName
            }
        })


    }catch(error){
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

export async function foodPartnerLogoutController(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message:"foodPartner logged out successfully"
    });
}