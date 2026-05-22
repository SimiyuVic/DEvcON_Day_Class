import { useState } from "react";


const AdminLogin = () => {
    const [Inputs, setInputs] =useState({
                userEmail: "",
                userPassword: "",
            });
        
            const change = (e)=>{
                const {name,value} = e.target;
                setInputs({...Inputs, [name]: value});
            }
    return ( 
        <div className="container py-5">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">
                                    Welcome Admin
                                </h2>
                                <p className="text-muted">
                                   Login to Continue!
                                </p>
                            </div>
                            <form>
                                <div class="form-floating mb-3">
                                    <input 
                                        type="email" 
                                        value={Inputs.userEmail}
                                        name="userEmail"
                                        class="form-control" 
                                        id="floatingInput" 
                                        placeholder="Enter Your Email" 
                                        onChange={change}
                                        />
                                    <label for="floatingInput">Enter Your Email</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input 
                                        type="password" 
                                        value={Inputs.userPassword}
                                        name="userPassword"
                                        class="form-control" 
                                        id="floatingInput" 
                                        placeholder="Enter Your Password" 
                                        onChange={change}
                                        />
                                    <label for="floatingInput">Enter Password</label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100"
                                >
                                    Login
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminLogin;