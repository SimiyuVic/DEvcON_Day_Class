import express from "express";
import { createCategory, fetchCategory } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createCategory",
    authMiddleware.verifyToken,
    authMiddleware.authRole("admin"),
    createCategory);

router.get("/fetchCategories", fetchCategory);

export default router; 