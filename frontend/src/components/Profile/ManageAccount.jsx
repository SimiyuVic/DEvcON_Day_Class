const ManageAccount = () => {
    return (
        <div className="container py-5">

            <div className="card border-0 shadow-sm p-4">

                <h2 className="fw-bold mb-4">
                    Manage Account
                </h2>

                <form>

                    {/* Profile Picture */}
                    <div className="text-center mb-4">

                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="rounded-circle border mb-3"
                            width="100"
                            height="100"
                        />

                        <div className="mb-3">
                            <input
                                type="file"
                                className="form-control"
                                accept="image/png, image/jpeg, image/jpg"
                            />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ManageAccount;