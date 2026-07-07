import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getMyApplications } from "../../services/workerService";

const MyApplications = () => {
  const workerId = localStorage.getItem("userId");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await getMyApplications(workerId);
      setApplications(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load applications");
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-success";
      case "REJECTED":
        return "bg-danger";
      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-warning fw-bold">📋 My Applications</h2>
          <Link to="/worker/jobs" className="btn btn-primary fw-bold">
            🔍 Find More Jobs
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm border-0 py-4">
            <h4 className="mb-0">You haven't applied for any jobs yet.</h4>
          </div>
        ) : (
          <div className="row">
            {applications.map((app) => (
              <div className="col-md-6 mb-4" key={app.applicationId}>
                <div className="card shadow-sm border-0 h-100 rounded-4">
                  <div className="card-header bg-dark text-gray-900 rounded-top-4 py-3">
                    <h5 className="mb-0">{app.job ? app.job.jobTitle : "Unknown Job"}</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Location:</strong> {app.job ? app.job.location : "N/A"}
                    </p>
                    <p>
                      <strong>Salary:</strong> ₹{app.job ? app.job.salary : 0}
                    </p>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Status:</span>
                      <span className={`badge ${getBadge(app.status)} fs-6`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyApplications;
