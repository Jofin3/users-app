import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Navbar() {
    const { isAuthenticated } = useAuth0();


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid header">
                <a className="navbar-brand" href="#">
                    Authentication App
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {isAuthenticated && ( // Render the "Home" link if authenticated
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/Profile">Profile</Link>
                                </li>
                            </>)}
                    </ul>


                    {isAuthenticated && <LogoutButton />}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;