import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import axios from "axios";
import { useSelector } from "react-redux";

const BlogList = () => {
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
                All Blogs
            </h2>

            <div className="row g-4">
                {blogs && blogs.map((blog, index) => (
                    <div key={index} className="col-12 col-md-4">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>

        </div>
     );
}
 
export default BlogList; 