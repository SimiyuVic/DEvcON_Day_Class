import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createBlog, loginAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

//login route
router.post("/admin-login", loginAdmin);

//create blog
router.post("/create-blog",
    authMiddleware.verifyToken,
    authMiddleware.authRole("admin"),
    upload.single("blogImage"),
    createBlog);

export default router; 