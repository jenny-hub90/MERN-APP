const asyncHandler = require('express-async-handler');
const generateToken = require('../utilis/generateToken'); 
const User = require('../models/userModel')


const authUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'Auth user'});
})

const registerUser = asyncHandler(async(req,res)=>{
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error('User already exists'); 
    }

    const user = await User.create({
        name, 
        email,
        password
    });

    if (user) {
        generateToken
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})

const logoutUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'Logout User'});
})

const getUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message : 'User profile'});
})

const updateUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'Updated user profile'});
})

module.exports = {logoutUser, registerUser, authUser, getUserProfile, updateUserProfile };