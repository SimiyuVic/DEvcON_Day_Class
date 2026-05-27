import { useState } from "react";
import { FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiGlass, CiMail } from "react-icons/ci";
import axios from "axios";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";


const ManageAccount = () => {
  //for redurection
  const history = useNavigate();

  //fetch the globally stored as a state backend utl
  const backendUrl = useSelector((state)=>state.prod.link);

  //fetch user data from redux state in App.jsx
  const user = useSelector((state)=>state.user.user);

  //console.log(backendUrl);
  const [changeAvatar, setChangeAvatar] = useState(null);

  const changeImage = (e) => {
    setChangeAvatar(e.target.files[0]);
  };

  const [Passwords, setPasswords] = useState({
    userPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const changePass = (e)=>{
    const { name, value } = e.target;
    setPasswords({...Passwords, [name]: value});
  }

  const handleChangePassword = async(e)=>{
    e.preventDefault();
    try
    {
      const response = await axios.put(`${backendUrl}/api/auth/change-password`,
        Passwords, {
          withCredentials: true
        }
      );
      if(response.data.success)
        {
            toast.success(response.data.message)
        }

        history("/");
    }
    catch(error)
    {
        //console.error(error);
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
    <div className="container py-4">

      <div className="card shadow-sm border-0 p-4 mb-4">

        <div className="d-flex align-items-center gap-4 flex-wrap">

          {/* Avatar Section*/}
          <div className="d-flex flex-column align-items-center">

            <div
              className="border rounded-circle d-flex align-items-center justify-content-center overflow-hidden shadow-sm"
              style={{ width: "150px", height: "150px", background: "#f8f9fa" }}
            >
              <label
                htmlFor="imgFile"
                className="w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ cursor: "pointer" }}
              >
                {changeAvatar ? (
                  <img
                    src={URL.createObjectURL(changeAvatar)}
                    alt="Avatar"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <FaUser size={60} className="text-secondary" />
                )}
              </label>
            </div>
            <input
              type="file"
              id="imgFile"
              className="d-none"
              onChange={changeImage}
              accept="image/*"
            />
            <button className="btn btn-primary mt-3">
              Change Avatar
            </button>

          </div>

          {/* User information */}
          <div className="flex-grow-1">
            <div className="p-3 rounded-3 bg-light border">

              <h4 className="mb-1 fw-bold">{user?.userName}</h4>

              <p className="mb-2 text-muted">
                Blogger • Developper
              </p>

              <div className="d-flex flex-column gap-1">
                <small className="text-muted">
                  <CiMail />  {user?.userEmail}
                </small>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Password Change Form */}
      <div className="card shadow-sm border-0 p-4">

        <h5 className="mb-4 fw-bold">Change Password</h5>

        <form className="row g-3" onSubmit={handleChangePassword}>

          {/* Current Password */}
          <div className="col-12">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                placeholder="Current Password"
                name="userPassword"
                value={Passwords.userPassword}
                onChange={changePass}
              />
              <label htmlFor="currentPassword">Current Password</label>
            </div>
          </div>

          {/* New Password */}
          <div className="col-12 col-md-6">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="New Password"
                name="newPassword"
                value={Passwords.newPassword}
                onChange={changePass}
              />
              <label htmlFor="newPassword">New Password</label>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="col-12 col-md-6">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                value={Passwords.confirmPassword}
                id="confirmPassword"
                placeholder="Confirm New Password"
                name="confirmPassword"
                onChange={changePass}
              />
              <label htmlFor="confirmPassword">Confirm New Password</label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-sm w-100"
            >
            Change Password
         </button>

        </form>

      </div>

    </div>
  );
};

export default ManageAccount;