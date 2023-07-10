import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = (props) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    props.showAlert("Logged out sucessfully", "success");
  };

  const toggleDetails = () => {
    console.log("hello hello hello ");
    var details = document.querySelector(".details");
    details.style.display = details.style.display === "none" ? "block" : "none";
  };

  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Navbar
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                Sign-up
              </Link>
            </form>
          ) : (
            <div className="login-menu">
              <button className="profile" onClick={toggleDetails}>
                <i className="fa-solid fa-user" />
              </button>
              <div className="details">
                <div className="icons">
                  <i className="fa-regular fa-user" />
                </div>
                <div className="icon-details">
                  <p>{localStorage.getItem("userName")}</p>
                </div>
                <div className="icons">
                  <i className="fa-regular fa-envelope mail-box" />
                </div>
                <div className="icon-details">
                  <p>{localStorage.getItem("userMail")}</p>
                </div>

                <div className="logout">
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
