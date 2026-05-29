import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";

const AddBlog = () => {

  const backendUrl = useSelector((state)=>state.prod.link);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState("");

  const handleCreateBlog = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("blogTitle", blogTitle);
      formData.append("blogDescription", blogDescription);
      formData.append("blogContent", blogContent);
      formData.append("blogImage", blogImage);

      const res = await axios.post(`${backendUrl}/api/admin/create-blog`,
        formData, {
          withCredentials: true
        }
      );

      console.log(res);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container py-4">
      
      <div className="mb-4">
        <h2 className="fw-bold">Create New Blog</h2>
        <p className="text-muted">Fill in the details below to publish a new blog post.</p>
      </div>

      <form className="card border-0 shadow-sm rounded-4 p-4" onSubmit={handleCreateBlog}>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Blog Title"
            value={blogTitle}
            onChange={(e)=>setBlogTitle(e.target.value)}
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Short description"
            value={blogDescription}
            onChange={(e)=>setBlogDescription(e.target.value)}
          />
          <label htmlFor="description">Description</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Write your blog content"
            id="content"
            style={{ height: "150px" }}
            value={blogContent}
            onChange={(e)=>setBlogContent(e.target.value)}
          ></textarea>
          <label htmlFor="content">Content</label>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Upload Image
          </label>

          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={(e)=>setBlogImage(e.target.files[0])}
          />

          <small className="text-muted">
            Allowed formats: JPG, JPEG, PNG
          </small>
        </div>

        <button className="btn btn-primary w-100 py-2 fw-semibold rounded-3">
          Publish Blog
        </button>

      </form>
    </div>
  );
};

export default AddBlog;