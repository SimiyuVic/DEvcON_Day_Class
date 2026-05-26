import express from "express";
import { 
    changePassword,
    checkCookie, 
    getProfileData, 
    loginUser, 
    logoutUser, 
    signUpUser } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();

//sign-up route
router.post("/sign-up", signUpUser);

//login route
router.post("/login", loginUser);

//check cookie
router.get("/check-cookie", checkCookie);

//logout user
router.post("/logout", logoutUser);

//fetch user data
router.get("/getUserProfile",
    authMiddleware.verifyToken,
    authMiddleware.authRole("user"),
    getProfileData);

//change password
router.post("/change-password",
    authMiddleware.verifyToken,
    authMiddleware.authRole("user"),
    changePassword);

export default router; 