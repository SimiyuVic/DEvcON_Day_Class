import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const AddBlog = () => {
  const backendUrl = useSelector((state) => state.prod.link);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState(null);

  const [categoryTitle, setCategoryTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");

  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("blogTitle", blogTitle);
      formData.append("blogDescription", blogDescription);
      formData.append("blogContent", blogContent);
      formData.append("blogImage", blogImage);
      formData.append("blogCategory", blogCategory);

      const res = await axios.post(
        `${backendUrl}/api/admin/create-blog`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(true);

        setBlogTitle("");
        setBlogDescription("");
        setBlogContent("");
        setBlogImage(null);
        setBlogCategory("");
      }

    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
    finally
    {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/category/createCategory`,
        { categoryTitle },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setCategoryTitle("");
        fetchCategories();
      }

    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/category/fetchCategories`,
        { withCredentials: true }
      );

      setAllCategories(res.data.allCategories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container py-4">

      {/* BLOG FORM */}
      <div className="mb-4">
        <h2 className="fw-bold">Create New Blog</h2>
        <p className="text-muted">Fill in the details below</p>
      </div>

      <form
        className="card border-0 shadow-sm rounded-4 p-4"
        onSubmit={handleCreateBlog}
      >

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="Title"

          />
          <label>Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
            placeholder="Description"

          />
          <label>Description</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            style={{ height: "150px" }}
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            placeholder="Content"

          />
          <label>Content</label>
        </div>

        {/* CATEGORY */}
        <label className="form-label fw-semibold">
          Choose Category
        </label>

        <select
          className="form-select mb-3"
          value={blogCategory}
          onChange={(e) => setBlogCategory(e.target.value)}
        >
          <option value="">Select Category</option>

          {allCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryTitle}
            </option>
          ))}
        </select>

        {/* IMAGE */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Upload Image</label>

          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setBlogImage(e.target.files[0])}

          />
        </div>

        <button className="btn btn-primary w-100 py-2 fw-semibold rounded-3" disabled={loading}>
          {loading ? "Publishing Blog . . ." : "Publish Blog"}
        </button>
      </form>

      {/* CATEGORY FORM */}
      <div className="mt-4">
        <h5 className="fw-bold">Create Category</h5>

        <form onSubmit={handleAddCategory} className="mt-2">

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              placeholder="Category"
  
            />
            <label>Category Name</label>
          </div>

          <button className="btn btn-primary">
            Add Category
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddBlog;