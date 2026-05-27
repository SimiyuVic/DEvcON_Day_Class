import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";

import {
  FaHome,
  FaHeart,
  FaThumbsUp,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";

const SideBar = () => {

  const user = useSelector((state)=>state.user.user);

  const location = useLocation();

  const history = useNavigate();

  const SideBarLinks = [
    {
      name: "Dashboard",
      to: "/profile",
      icon: <FaHome />,
    },
    {
      name: "Favourites",
      to: "/profile/favourites",
      icon: <FaHeart />,
    },
    {
      name: "Liked Blogs",
      to: "/profile/liked-blogs",
      icon: <FaThumbsUp />,
    },
    {
      name: "Manage Account",
      to: "/profile/manage-account",
      icon: <FaUserGear />,
    },
    {
      name: "Help",
      to: "/profile/help-section",
      icon: <FiHelpCircle />,
    },
  ];
  const dispatch = useDispatch();
  const backendLink = useSelector((state)=>state.prod.link);
  //console.log(backendLink)
  const handleLogout = async()=>{
    try
    {
      const res = await axios.post(`${backendLink}/api/auth/logout`,
        {},
        {
          withCredentials: true
        }
      );

      dispatch(authActions.logout());

      if(res.data.message)
        {
            toast.success(res.data.message)
        }

      history("/");
    }
    catch(error)
    {
    if (error.response && error.response.data) {
          if (error.response.data.success === false) {
              toast.error(error.response.data.message);
          }
          
      } else {
          toast.error("Server is unreachable. Please try again later!");
      }
    }
  }

  return (
    <div
      className="d-flex flex-column bg-white shadow-sm border-end p-4"
      style={{
        width: "280px",
        minHeight: "100vh",
      }}
    >
      <div className="text-center mb-3">
        <FaUserCircle
          size={70}
          className="text-primary mb-3"
        />

        <h5 className="fw-bold mb-1">
         {user?.userName}
        </h5>

        <p className="text-muted small">
          {user?.userEmail}
        </p>
      </div>
      <ul className="nav nav-pills flex-column gap-2">

        {SideBarLinks.map((item, i) => {
          const isActive = location.pathname === item.to;

          return (
            <li className="nav-item" key={i}>
              <Link
                to={item.to}
                className={`nav-link d-flex align-items-center gap-3 px-3 py-3 rounded-3 fw-semibold ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-dark"
                }`}
              >
                <span style={{ fontSize: "1.1rem" }}>
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}

      </ul>
      <div className="mt-auto mb-3">
        <div className="card border-0 bg-primary text-white rounded-3 shadow-sm">
          <div className="card-body">
            <h6 className="fw-bold">
              Keep Writing
            </h6>

            <p className="small mb-0">
              Share your ideas and inspire others with your blogs.
            </p>
          </div>
        </div>
      </div>
      <button
      onClick={handleLogout}
        className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default SideBar;