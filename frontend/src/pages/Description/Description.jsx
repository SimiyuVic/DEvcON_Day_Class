import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsChatRightQuote } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";



const Description = () => {

    const backendUrl = useSelector((state)=>state.prod.link);
    const { id } = useParams();

    const [blog, setBlog] = useState([]);

    //fetch blogDetails
    const fetchBlogDetails = async()=>{
        try 
        {
            const res = await axios.get(`${backendUrl}/api/blogs/blogDetails/${id}`, {
                withCredentials: true
            });
            setBlog(res.data.blog);
        } 
        catch (error) 
        {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchBlogDetails();
    },[]);

    return ( 
        <div className="container my-5">
            <div className="text-center mb-5">
                <p className="lead text-muted">Insights, stories, and ideas from our experts</p>
            </div>
            <div className="row justify-content-center mb-5">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="row g-0 align-items-center">
                            <div className="col-md-3 text-center p-3">
                                <img 
                                    src={blog && blog.blogImage} 
                                    alt={blog && blog.blogTitle}
                                    className="rounded-circle img-fluid"
                                    style={{objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <h5 className="card-title mb-1">
                                        {blog && blog.blogTitle}
                                    </h5>
                                    <p className="text-muted mb-2">Developer & Tech Enthusiast</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border-0 bg-light">
                        <div className="card-body p-4">
                            <h3 className="mb-3">
                                {blog && blog.blogDescription}
                            </h3>
                            <p>
                                {blog && blog.blogContent}
                            </p>
                            <hr className="my-4" />
                            <p className="fst-italic text-muted">
                                <i className="me-2">
                                    <BsChatRightQuote />
                                </i>
                                "I do not have anything to say , just thought it is cute being here!"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Description;