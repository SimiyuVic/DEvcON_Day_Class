import express from "express";
import { blogContent, fetchAllBlogs, fetchRecentBlogs } from "../controllers/blogs.controller.js";


const router = express.Router();

//all blogs
router.get("/allBlogs", fetchAllBlogs);

//Recent Blogs
router.get("/recentBlogs", fetchRecentBlogs);

//fetch blog by id
router.get("/blogDetails/:id", blogContent);


export default router; 