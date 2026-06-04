import express from "express";
import { 
    blogsByCategory, 
    createCategory, 
    fetchCategory } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; 

const router = express.Router();

//creating categories
router.post("/createCategory",
    authMiddleware.verifyToken,
    authMiddleware.authRole("admin"),
    createCategory);

//fetching categories
router.get("/fetchCategories", fetchCategory);

//fetching blogs associated with a given category
router.get("/blogCategories/:id", blogsByCategory);

export default router; 