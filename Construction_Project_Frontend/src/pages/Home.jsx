import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          background: "linear-gradient(135deg,#ff6f00,#ff9800)",
          minHeight: "85vh",
        }}
      >
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">

              <h1 className="display-4 fw-bold">
                Find Skilled Construction Workers Easily
              </h1>

              <p className="lead mt-4">
                A platform that connects Contractors with Skilled Workers
                quickly, safely and efficiently.
              </p>

              <div className="mt-4">

                <a
                  href="/register"
                  className="btn btn-light btn-lg px-4 me-3 fw-bold"
                >
                  Get Started
                </a>

                <a
                  href="/login"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Login
                </a>

              </div>

            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">

              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700"
                className="img-fluid rounded shadow-lg"
                alt="Construction"
              />

            </div>

          </div>
        </div>
      </section>

      {/* About Section */}

      <section className="container py-5">

        <div className="text-center mb-5">

          <h2 className="fw-bold">About Our Project</h2>

          <p className="text-muted">
            Our application solves the problem of connecting construction
            workers with contractors in a simple and reliable way.
          </p>

        </div>

        <div className="row text-center">

          <div className="col-md-4 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h3>👷</h3>

                <h5>Workers</h5>

                <p>
                  Search nearby jobs, apply easily, and build your career.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h3>🏗</h3>

                <h5>Contractors</h5>

                <p>
                  Post jobs, review worker profiles, and hire skilled workers.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h3>🛡</h3>

                <h5>Admin</h5>

                <p>
                  Manage users, jobs and maintain the complete platform.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Features
            </h2>

          </div>

          <div className="row">

            <div className="col-md-3 text-center mb-4">
              <h1>📍</h1>
              <h5>Location Based Jobs</h5>
            </div>

            <div className="col-md-3 text-center mb-4">
              <h1>📱</h1>
              <h5>OTP Login</h5>
            </div>

            <div className="col-md-3 text-center mb-4">
              <h1>⭐</h1>
              <h5>Contractor Ratings</h5>
            </div>

            <div className="col-md-3 text-center mb-4">
              <h1>💼</h1>
              <h5>Easy Job Applications</h5>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer
        className="text-center text-white py-4"
        style={{
          background: "#222"
        }}
      >

        <h5>Construction Worker Portal</h5>

        <p>
          Built using React • Spring Boot • PostgreSQL
        </p>

        <small>
          © 2026 All Rights Reserved
        </small>

      </footer>

    </>
  );
}

export default Home;
