import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryTitle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;