import { useSelector } from "react-redux";
import BlogTable from "../../BlogCard/BlogTable";
import { useState, useEffect } from "react";
import axios from "axios";


const EditBlog = () => {

    const backendUrl = useSelector((state)=>state.prod.link);
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async()=>{
        try 
        {
            const res = await axios.get(`${backendUrl}/api/blogs/allBlogs`, 
                {
                    withCredentials: true
                }
            );
            setBlogs(res.data.blogs);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchBlogs();
    }, []);

    return (
        <div className="container my-5">

            <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#171819" }}
            >
                Manage Blogs
            </h2>

            <BlogTable blogs={blogs} />

        </div>
    );
}

export default EditBlog;