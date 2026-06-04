import express from "express";
import Blog from "../models/blog.model.js";

//fetch all blogs
export const fetchAllBlogs = async(req, res)=>{
    try 
    {
        const blogs = await Blog.find();
        if(!blogs)
        {
            return res.status(404).json({
                success: false,
                message: "No Blog Found!"
            });
        }
        return res.status(200).json({
            success: true,
            blogs
        });
    } 
    catch (error) 
    {
        return res.status(500).json({
            success: false,
            message: "Cannot Fetch Blogs"
        });
    }
}

//fetch recent blogs
export const fetchRecentBlogs = async(req, res)=>{
    try 
    {
        const blogs = await Blog.find().sort({createdAt: -1}).limit(3);
        if(!blogs)
        {
            return res.status(404).json({
                success: false,
                message: "No Blog Found!"
            });
        }
        return res.status(200).json({
            success: true,
            blogs
        });
    } 
    catch (error) 
    {
        return res.status(500).json({
            success: false,
            message: "Cannot Fetch Blogs"
        });
    }
}

//fetch blog content
export const blogContent = async(req, res)=>{
    try 
    {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if(!blog)
        {
            return res.status(404).json({
                success: false,
                message: "Blog Does Not Exist!"
            });
        }
        return res.status(200).json({
            success: true,
            blog
        })
    } 
    catch (error) 
    {
        return res.status(500).json({
            success: false,
            message: "Cannot Fetch Blog Details!"
        });
    }
}

//edit blog
export const editBlog = async(req, res)=>{
  try 
  {
    const { id } = req.params;
    const { blogTitle, blogDescription, blogContent } = req.body;

    if(!blogTitle || !blogDescription || !blogContent)
    {
      return res.status(400).json({
        success: false,
        message: "All Fields Required before an Update!"
      });
    }

    const blog = await Blog.findByIdAndUpdate(id, 
      {
        blogTitle, 
        blogDescription, 
        blogContent
      }
    );

    if(!blog)
    {
      return res.status(404).json({
        success: false,
        message: "Blog Does Not Exist!"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog Updated !"
    });
  } 
  catch (error) 
  {
    return res.status(500).json({
      success: false,
      message: "Cannot Edit Blog!"
    });
  }
}

//delete blog
export const deleteBlog = async(req, res)=>{
  try 
  {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id)

    if(!blog)
    {
      return res.status(404).json({
        success: false,
        message: "Blog Does Not Exist!"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog Deleted !"
    });
  } 
  catch (error) 
  {
    return res.status(500).json({
      success: false,
      message: "Cannot Delete Blog!"
    });
  }
}