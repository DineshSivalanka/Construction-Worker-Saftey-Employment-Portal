import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow"
      style={{
        background: "linear-gradient(90deg, #ff6f00, #ff9800)",
        minHeight: "85px",
      }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold text-white fs-3"
          to="/"
        >
          🏗 Construction Portal
        </Link>

        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto align-items-center">

            {!userId ? (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white fw-semibold" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white fw-semibold" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="btn btn-light text-warning fw-bold px-4 rounded-pill" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {role === "WORKER" && (
                  <>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/worker/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/worker/profile">My Profile</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/worker/jobs">Find Jobs</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/worker/my-applications">My Applications</Link>
                    </li>
                  </>
                )}
                {role === "CONTRACTOR" && (
                  <>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/contractor/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/contractor/post-job">Post Job</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/contractor/my-jobs">My Jobs</Link>
                    </li>
                  </>
                )}
                {role === "ADMIN" && (
                  <>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/admin/workers">Workers</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/admin/contractors">Contractors</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link text-white fw-semibold" to="/admin/jobs">Jobs</Link>
                    </li>
                  </>
                )}

                <li className="nav-item mx-2">
                  <button 
                    className="btn btn-danger fw-bold px-4 rounded-pill shadow-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
