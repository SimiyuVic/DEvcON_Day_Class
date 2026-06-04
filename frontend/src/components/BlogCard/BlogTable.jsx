import { Link } from "react-router-dom";

const BlogTable = ({ blogs = [] }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                
                <thead className="table-primary">
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Excerpt</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {blogs && blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <tr key={blog._id}>
                                
                                <td className="text-muted">
                                    {index + 1}
                                </td>

                                <td className="fw-bold">
                                    {blog.blogTitle}
                                </td>

                                <td className="text-muted" style={{ maxWidth: "400px" }}>
                                    {blog.blogDescription.substring(0,30)} . . .
                                </td>

                                <td>
                                    <Link
                                        to={`/admin-dashboard/update-blog/${blog.id}`}
                                        className="btn btn-outline-primary btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/description/${blog.id || blog._id}`}
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        Delete
                                    </Link>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-muted py-4">
                                No blogs available
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default BlogTable;