import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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

            <li className="nav-item mx-2">
              <Link
                className="nav-link text-white fw-semibold"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link
                className="nav-link text-white fw-semibold"
                to="/login"
              >
                Login
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link
                className="btn btn-light text-warning fw-bold px-4 rounded-pill"
                to="/register"
              >
                Register
              </Link>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
