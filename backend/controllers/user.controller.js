import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signup controller
export const signUpUser = async(req,res)=>{ 

    const {userName, userEmail, userPassword, userRole} =req.body;

    //form validation
    if(!userName || !userEmail || !userPassword)
    {
        return res.status(400).json({
            success: false, 
            message: "All Fields Required!"
        });
    }

    //check existing username and email
    const existingUser = await User.findOne({$or: [{userName}, {userEmail}]});

    if(existingUser)
    {
        return res.status(409).json({
            success: false,
            message: "UserName or Email exists!"
        })
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new User({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userRole
    });

    await newUser.save();

    res.status(200).json({
        success: true,
        message: `User with UserName ${userName} created`
    });

}

//login controller
export const loginUser = async(req,res)=>{
    try
    {
        const {userEmail, userPassword} = req.body; 
        //validate the form
        if(!userEmail || !userPassword)
        {
            return res.status(400).json({
                success: false,
                message: "All Fields Required!"
            });
        }
        //check if user exists
        const user = await User.findOne({userEmail}).select("+userPassword");

        if(!user)
        {
            return res.status(409).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }

        //check password
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if(!isMatch)
        {
            return res.status(409).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }

        //create a token
       const token = jwt.sign(
        {
            id: user._id,
            userRole: user.userRole,
        },
        process.env.JWT_SECRETKEY,
        {
            expiresIn: "2d"
        }
       );

       //create a cookie
       res.cookie("loginCookie",token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
       });

       //res.status(200).json({token}); 

        res.status(201).json({
            success: true,
            message: `Welcome ${userEmail}, You Have been Logged in!`
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong while Trying to Login the user!"
        })
    }
}

//check cookie
export const checkCookie =(req,res)=>{
    try
    {
        const token = req.cookies.loginCookie;
        if(token)
        {
            return res.status(200).json({message: true}); 
        }
        else
        {
            return res.status(200).json({message: false}); 
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({success: false, message: "Error while getting cookie!"});
    }
} 

//logout
export const logoutUser = (req, res)=>{
    try
    {
        res.clearCookie("loginCookie", 
        {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/"
        });

        res.status(200).json({
            success: true,
            message: "Logged Out Successfully!"
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Something went wrong While trying to Logout!"
        })
    }
}

//fetch user data
export const getUserData = async(req, res)=>{
    try
    {
        const { user } = req;
        console.log(user);

        return res.status(200).json({
            data: user
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching Data"
        });
    }
}