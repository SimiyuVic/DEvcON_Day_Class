import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = {
    verifyToken: async(req, res, next)=>{
        //check if user token exists
        const token = req.cookies.dayCookie;
        if(!token)
        {
            return res.status(401).json({
                success: false,
                message: "Token does not exist!"
            });
        }
        
        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            //fetch user data
            const user = await User.findById(decoded.id);

            if(!user)
            {
                return res.status(404).json({
                    success: false,
                    message: "User Does not exist!"
                });
            }

            req.user = user;  
            next(); 
        }
        catch(error)
        {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: "Access Denied, no data found"
            });

        }
    },
    authRole: (userRole)=>{
        return (req, res, next)=>{
            if(!req.user || req.user.userRole !== userRole)
            {
                return res.status(403).json({
                    success: false,
                    message: "Access Denied"
                });
            }
            next(); 
        }
    }
}