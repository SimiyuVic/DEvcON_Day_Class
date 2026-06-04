import { Link } from "react-router-dom";
import axios from "axios"
import {useSelector} from "react-redux";
import { useState, useEffect } from "react";

const Categories = () => {
    const backendUrl = useSelector((state)=>state.prod.link);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async()=>{
        try 
        {
            const res = await axios.get(`${backendUrl}/api/category/fetchCategories`, {
                withCredentials: true
            });
            setCategories(res.data.allCategories);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchCategories();
    }, []);
    

    return (
        <div className="container my-5">
            <h3 className="mb-4 fw-bold text-center">Explore Categories</h3>
            <div className="row g-3 justify-content-center">
                {categories && categories.map((category, index) => (
                    <div key={index} className="col-12 col-md-4">

                        <Link
                            to={`/category/${category._id}`}
                            className="text-decoration-none"
                        >
                            <div
                                className="p-4 text-center shadow-sm rounded category-card"
                            >
                                <h5 className="fw-semibold m-0">
                                    {category.categoryTitle}
                                </h5>
                            </div>
                        </Link>

                    </div>
                ))}
            </div>
            <style>
                {`
                    .category-card {
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        transition: 0.3s ease;
                        cursor: pointer;
                    }

                    .category-card:hover {
                        transform: translateY(-5px);
                        border-color: #0ea5e9;
                        box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
                    }
                `}
            </style>
        </div>
    );
};

export default Categories;