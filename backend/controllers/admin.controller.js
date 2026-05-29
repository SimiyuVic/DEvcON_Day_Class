import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Blog from "../models/blog.model.js";

//sign in controller
export const loginAdmin = async(req,res)=>{
    try
    {
    const {userEmail, userPassword} = req.body;

    //form validation
    if(!userEmail || !userPassword)
    {
        return res.status(400).json({
            success: false,
            message: "Must Fill in Email and Password!"
        });
    }
    const user = await User.findOne({userEmail}).select("+userPassword");
    if(!user)
    {
        return res.status(409).json({
            success: false,
            message: "Wrong Email or Password! "
        });
    }
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if(!isMatch)
    {
        return res.status(409).json({
            success: false,
            message: "Wrong Email or Password! "
        });
    }

    //set token
    const token = jwt.sign(
        {
            id: user._id,
            userEmail: user.userEmail
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "2d" 
        }
    );
    //set cookie
    res.cookie("dayCookie", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
        path: "/"
    });

    res.status(201).json({
        success: true,
        message: `Welcome Back ${userEmail}` 
    });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while trying to LogIn!"
        });
    }
}

//create blog
export const createBlog = async(req, res)=>{
    try 
    {
        const {user} = req;
        const { blogTitle, blogDescription, blogContent} = req.body;

        if(!blogTitle || !blogDescription || !blogContent)
        {
            res.status(400).json({
                success: false,
                message: "All Form Fields Required!"
            });
        }
        if(!req.file)
        {
            res.status(400).json({
                success: false,
                message: "No Image Selected!"
            });
        }

        //saving the data
        const newBlog = new Blog({
            blogTitle,
            blogDescription,
            blogContent,
            blogImage: req.file.path
        });

        await newBlog.save();

        res.status(201).json({
            success: true,
            message: "Blog Created!"
        });

    } catch (error) 
    {
        res.status(500).json({
            success: false,
            message: "Something went wrong while trying to LogIn!"
        });
    }
}