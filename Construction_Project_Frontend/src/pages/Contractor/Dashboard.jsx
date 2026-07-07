import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

function ContractorDashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="text-warning fw-bold mb-4">
          🏗 Contractor Dashboard
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body text-center">

                <h1>➕</h1>

                <h4>Post New Job</h4>

                <p>Create a new construction job.</p>

                <Link
                  className="btn btn-warning"
                  to="/contractor/post-job"
                >
                  Post Job
                </Link>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body text-center">

                <h1>📋</h1>

                <h4>My Jobs</h4>

                <p>View all posted jobs.</p>

                <Link
                  className="btn btn-primary"
                  to="/contractor/my-jobs"
                >
                  View Jobs
                </Link>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body text-center">

                <h1>👷</h1>

                <h4>Applicants</h4>

                <p>Manage workers who applied.</p>

                <Link
                  className="btn btn-success"
                  to="/contractor/applicants"
                >
                  View Applicants
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ContractorDashboard;
