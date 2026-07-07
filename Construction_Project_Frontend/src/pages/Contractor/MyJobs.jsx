import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getMyJobs, deleteJob } from "../../services/contractorService";

function MyJobs() {
  const contractorId = localStorage.getItem("userId");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await getMyJobs(contractorId);
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(jobId);
        alert("Job deleted successfully");
        loadJobs(); // Refresh the list
      } catch (error) {
        console.error(error);
        alert("Failed to delete job");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary fw-bold">📋 My Posted Jobs</h2>
          <Link to="/contractor/post-job" className="btn btn-warning fw-bold">
            ➕ Post New Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center mt-5">
            <h4 className="text-muted">You haven't posted any jobs yet.</h4>
          </div>
        ) : (
          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-6 mb-4" key={job.jobId}>
                <div className="card shadow-sm border-0 h-100 rounded-4">
                  <div className="card-header bg-dark text-white rounded-top-4 py-3">
                    <h5 className="mb-0">{job.jobTitle}</h5>
                  </div>
                  <div className="card-body">
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Salary:</strong> ₹ {job.salary}</p>
                    <p><strong>Workers Needed:</strong> {job.workersRequired}</p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <hr />
                    <div className="d-flex justify-content-between mt-3">
                      <Link to={`/contractor/edit-job/${job.jobId}`} className="btn btn-primary text-white">
                        ✏️ Edit
                      </Link>
                      <Link to={`/contractor/applicants/${job.jobId}`} className="btn btn-success text-white">
                        👥 View Applicants
                      </Link>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(job.jobId)}
                      >
                        🗑 Delete
                      </button>
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
}

export default MyJobs;
