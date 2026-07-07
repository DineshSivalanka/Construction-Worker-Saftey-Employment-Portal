import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  getApplicants,
  acceptApplicant,
  rejectApplicant,
} from "../../services/contractorService";

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  const loadApplicants = async () => {
    try {
      const response = await getApplicants(jobId);
      setApplicants(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load applicants");
    }
  };

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const handleAccept = async (applicationId) => {
    try {
      await acceptApplicant(applicationId);
      alert("Applicant Accepted!");
      loadApplicants();
    } catch (error) {
      console.error(error);
      alert("Failed to accept applicant");
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await rejectApplicant(applicationId);
      alert("Applicant Rejected");
      loadApplicants();
    } catch (error) {
      console.error(error);
      alert("Failed to reject applicant");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary fw-bold">👥 Job Applicants</h2>
          <Link to="/contractor/my-jobs" className="btn btn-secondary fw-bold">
            🔙 Back to My Jobs
          </Link>
        </div>

        {applicants.length === 0 ? (
          <div className="text-center mt-5">
            <h4 className="text-muted">No one has applied for this job yet.</h4>
          </div>
        ) : (
          <div className="row">
            {applicants.map((app) => (
              <div className="col-md-6 mb-4" key={app.applicationId}>
                <div className="card shadow-sm border-0 h-100 rounded-4">
                  <div className="card-header bg-dark text-white rounded-top-4 py-3">
                    <h5 className="mb-0">
                      👷 {app.worker ? app.worker.workerName : "Unknown Worker"}
                    </h5>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Skill:</strong>{" "}
                      <span className="badge bg-warning text-dark">
                        {app.worker ? app.worker.skill : "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong>Experience:</strong>{" "}
                      {app.worker ? app.worker.experienceYears : 0} Years
                    </p>
                    <p>
                      <strong>Location:</strong>{" "}
                      {app.worker ? app.worker.currentLocation || app.worker.address : "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          app.status === "ACCEPTED"
                            ? "bg-success"
                            : app.status === "REJECTED"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {app.status}
                      </span>
                    </p>

                    <hr />

                    {app.status === "PENDING" ? (
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-success fw-bold w-45"
                          onClick={() => handleAccept(app.applicationId)}
                        >
                          ✅ Accept
                        </button>

                        <button
                          className="btn btn-danger fw-bold w-45"
                          onClick={() => handleReject(app.applicationId)}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-muted">
                        <em>Action already taken</em>
                      </div>
                    )}
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

export default Applicants;
