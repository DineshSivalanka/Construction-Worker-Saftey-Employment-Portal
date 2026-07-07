import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

function WorkerDashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="fw-bold text-warning mb-4">
          👷 Worker Dashboard
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">

            <div className="card shadow h-100 border-0">

              <div className="card-body text-center">

                <h1>👤</h1>

                <h4>My Profile</h4>

                <p>
                  Update your personal details and work experience.
                </p>

                <Link
                  to="/worker/profile"
                  className="btn btn-warning"
                >
                  View Profile
                </Link>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow h-100 border-0">

              <div className="card-body text-center">

                <h1>💼</h1>

                <h4>Available Jobs</h4>

                <p>
                  Browse all jobs posted by contractors.
                </p>

                <Link
                  to="/worker/jobs"
                  className="btn btn-success"
                >
                  View Jobs
                </Link>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow h-100 border-0">

              <div className="card-body text-center">

                <h1>📄</h1>

                <h4>My Applications</h4>

                <p>
                  Check the status of jobs you have applied for.
                </p>

                <Link
                  to="/worker/my-applications"
                  className="btn btn-primary"
                >
                  View Applications
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default WorkerDashboard;
