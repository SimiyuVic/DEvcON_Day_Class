import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsChatRightQuote } from "react-icons/bs";



const Description = () => {
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
                                    src="/profile.jpg" 
                                    alt="Author"
                                    className="rounded-circle img-fluid"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <h5 className="card-title mb-1">Simiyu Vic (DeadPool .lol:)</h5>
                                    <p className="text-muted mb-2">Developer & Tech Enthusiast</p>
                                    <p className="card-text">
                                        <i className="me-2">
                                            <FaXTwitter />
                                        </i> @SimiyuVic
                                        <span className="mx-2">•</span>
                                        <i className="me-2">
                                            <FaGithub />
                                        </i> SimiyuVic
                                    </p>
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
                            <h3 className="mb-3">NextJs and API Design</h3>
                            <p className="lead">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <p>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
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