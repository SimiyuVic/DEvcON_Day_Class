import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle, FaHeart, FaFileAlt, FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
  const stats = [
    {
      title: "My Blogs",
      value: 12,
      icon: <FaFileAlt />,
    },
    {
      title: "Favourites",
      value: 8,
      icon: <FaHeart />,
    },
    {
      title: "Comments",
      value: 24,
      icon: <FaComments />,
    },
  ];

  const [profile, setProfile] = useState("");

  const backendLink = useSelector((state)=>state.prod.link);
  //console.log(backendLink);

  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get(`${backendLink}/api/auth/getUserProfile`, {
        withCredentials: true
      })
      //console.log(res.data.data)
      setProfile(res.data.data);
    }
    fetch();
  },[backendLink]);

  return (
    <div className="container-fluid">
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body d-flex align-items-center gap-3">
          <div
            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "70px", height: "70px", fontSize: "2rem" }}
          >
            <FaUserCircle />
          </div>

          <div>
            <h3 className="mb-1">Welcome Back, {profile.userName} </h3>
            <p className="text-muted mb-0">
              Manage your blogs, favourites and profile here.
            </p>
            <p>{profile.userEmail}</p>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">{stat.title}</h6>
                  <h2 className="fw-bold">{stat.value}</h2>
                </div>

                <div
                  className="bg-light text-primary rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card shadow-sm border-0 rounded-4 mt-4">
        <div className="card-body">
          <h4 className="mb-3">Recent Activity</h4>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              You published a new blog post.
            </li>

            <li className="list-group-item">
              Someone commented on your article.
            </li>

            <li className="list-group-item">
              You added a blog to favourites.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;