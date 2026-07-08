import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getMyJobs, updateJob } from "../../services/contractorService";
import { FaEdit, FaSave, FaArrowLeft } from "react-icons/fa";

function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const contractorId = localStorage.getItem("userId");

  const [job, setJob] = useState({
    jobTitle: "",
    location: "",
    workingHours: "9 AM - 6 PM",
    salary: "",
    workersRequired: "",
    experienceRequired: "",
    description: "",
    status: "OPEN"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getMyJobs(contractorId);
        const matchedJob = response.data.find(j => j.jobId.toString() === jobId.toString());
        if (matchedJob) {
          setJob({
            jobTitle: matchedJob.jobTitle || "",
            location: matchedJob.location || "",
            workingHours: matchedJob.workingHours || "9 AM - 6 PM",
            salary: matchedJob.salary || "",
            workersRequired: matchedJob.workersRequired || "",
            experienceRequired: matchedJob.experienceRequired || "",
            description: matchedJob.description || "",
            status: matchedJob.status || "OPEN"
          });
        } else {
          alert("Job not found!");
          navigate("/contractor/my-jobs");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId, contractorId, navigate]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...job,
      salary: parseFloat(job.salary) || 0,
      workersRequired: parseInt(job.workersRequired) || 1,
      experienceRequired: parseInt(job.experienceRequired) || 0
    };

    try {
      await updateJob(jobId, payload);
      alert("Job updated successfully!");
      navigate("/contractor/my-jobs");
    } catch (error) {
      console.error(error);
      alert("Failed to update job. Please try again.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div 
              className="bg-[#FDF2F5] rounded-3xl p-5 shadow-lg border border-[#D8125B]/20 position-relative" 
              style={{ borderTop: '6px solid #D8125B' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-b border-[#D8125B]/10">
                <h3 className="fw-bold text-[#D8125B] mb-0 d-flex align-items-center gap-2">
                  <FaEdit /> Edit Job Posting
                </h3>
                <span className={`badge rounded-pill px-3 py-1.5 text-xs fw-semibold ${
                  job.status === "OPEN" 
                    ? "bg-[#198754] text-white shadow-sm" 
                    : "bg-[#dc3545] text-white shadow-sm"
                }`}>
                  Status: {job.status}
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-gray-700">Job Title</label>
                    <input
                      type="text"
                      className="form-control rounded-xl border-gray-200"
                      name="jobTitle"
                      value={job.jobTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-gray-700">Location</label>
                    <input
                      type="text"
                      className="form-control rounded-xl border-gray-200"
                      name="location"
                      value={job.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold text-gray-700">Working Hours</label>
                    <input
                      type="text"
                      className="form-control rounded-xl border-gray-200"
                      name="workingHours"
                      value={job.workingHours}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold text-gray-700">Salary (₹)</label>
                    <input
                      type="number"
                      className="form-control rounded-xl border-gray-200"
                      name="salary"
                      value={job.salary}
                      onChange={handleChange}
                      required
                      min="1"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold text-gray-700">Workers Required</label>
                    <input
                      type="number"
                      className="form-control rounded-xl border-gray-200"
                      name="workersRequired"
                      value={job.workersRequired}
                      onChange={handleChange}
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-gray-700">Experience Required (Years)</label>
                    <input
                      type="number"
                      className="form-control rounded-xl border-gray-200"
                      name="experienceRequired"
                      value={job.experienceRequired}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-gray-700">Job Status</label>
                    <select
                      className="form-select rounded-xl border-gray-200"
                      name="status"
                      value={job.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-gray-700">Job Description</label>
                  <textarea
                    className="form-control rounded-xl border-gray-200"
                    name="description"
                    rows="4"
                    value={job.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-3 pt-2">
                  <button
                    type="button"
                    className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-4 py-2.5 font-semibold text-sm transition-all hover:bg-[#d97706] hover:text-white bg-white"
                    onClick={() => navigate("/contractor/my-jobs")}
                    style={{ border: '1px solid #d97706', color: '#d97706', height: '42px' }}
                  >
                    <FaArrowLeft /> Back to Jobs
                  </button>

                  <button
                    type="submit"
                    className="btn btn-sm text-[#212529] d-flex align-items-center gap-1.5 rounded-xl px-4 py-2.5 font-bold text-sm transition-all shadow-sm flex-grow-1 justify-content-center border-0 hover:bg-[#e0a800]"
                    style={{ backgroundColor: '#ffc107', height: '42px' }}
                  >
                    <FaSave /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditJob;
