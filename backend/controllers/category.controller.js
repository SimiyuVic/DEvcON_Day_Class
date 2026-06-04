import express from "express";
import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";

//create category
export const createCategory = async (req, res) => {
  try {
    const { categoryTitle } = req.body;

    // form validation
    if (!categoryTitle) {
      return res.status(400).json({
        success: false,
        message: "Category cannot be empty",
      });
    }

    // check existing category
    const existingCategory = await Category.findOne({ categoryTitle });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // save category
    const newCategory = new Category({
      categoryTitle,
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category Created!",
      category: newCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cant create category!",
    });
  }
};
 
//fetch categories
export const fetchCategory = async(req, res)=>{
    try
    {
        const allCategories = await Category.find().sort("-createdAt")

        return res.status(200).json({
            success: true,
            allCategories
        });
    }
    catch(error)
    {
        return res.status(500).json({
        success: false,
        message: "Cant create category!",
        });
    }
}

//display blogs by category
export const blogsByCategory = async(req, res)=>{
    try 
    {
     const { id } = req.params;  
     const blogs = await Blog.find({blogCategory: id}).populate("blogCategory");

     if(!blogs) 
     {
        return res.status(404).json({
          success: false,
          message: " No Blogs Found!",
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
        message: "Cant Fetch Blogs!",
        });
    }
}