import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getJobs, deleteJob } from "../../services/adminService";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to load jobs", error);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(jobId);
      alert("Job deleted successfully");
      loadJobs();
    } catch (error) {
      console.error("Failed to delete job", error);
      alert("Failed to delete job");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-success fw-bold">📋 Manage Jobs</h2>
          <Link to="/admin/dashboard" className="btn btn-secondary fw-bold">
            🔙 Back to Dashboard
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm py-4">
            <h4 className="mb-0">No jobs posted yet.</h4>
          </div>
        ) : (
          <div className="table-responsive shadow rounded-4">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Job Title</th>
                  <th>Contractor</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.jobId}>
                    <td className="fw-bold">{job.jobTitle || "N/A"}</td>
                    <td>{job.contractor ? job.contractor.contractorName : "N/A"}</td>
                    <td>{job.location || "N/A"}</td>
                    <td>₹{job.salary || 0}</td>
                    <td>
                      <span className={`badge ${job.status === "OPEN" ? "bg-success" : "bg-danger"}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm fw-bold"
                        onClick={() => handleDelete(job.jobId)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminJobs;
