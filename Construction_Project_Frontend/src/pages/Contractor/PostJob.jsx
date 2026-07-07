import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { createJob } from "../../services/contractorService";

function PostJob() {
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
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation to ensure fields are populated correctly
    const payload = {
        ...job,
        salary: parseFloat(job.salary) || 0,
        workersRequired: parseInt(job.workersRequired) || 1,
        experienceRequired: parseInt(job.experienceRequired) || 0
    };

    try {
      await createJob(contractorId, payload);
      alert("Job posted successfully!");
      navigate("/contractor/my-jobs");
    } catch (error) {
      console.error(error);
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div
                className="card-header text-gray-900 rounded-top-4 py-3"
                style={{
                  background: "linear-gradient(135deg, #ff9800, #ff5722)",
                }}
              >
                <h3 className="mb-0 text-center fw-bold">➕ Post New Job</h3>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        placeholder="e.g. Mason, Plumber, Electrician"
                        value={job.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        placeholder="City or Site Address"
                        value={job.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">Working Hours</label>
                      <input
                        type="text"
                        className="form-control"
                        name="workingHours"
                        value={job.workingHours}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">Salary (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="salary"
                        placeholder="Per Day"
                        value={job.salary}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">Workers Required</label>
                      <input
                        type="number"
                        className="form-control"
                        name="workersRequired"
                        value={job.workersRequired}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Minimum Experience Required (Years)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="experienceRequired"
                      value={job.experienceRequired}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Job Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="4"
                      placeholder="Describe the job role and requirements..."
                      value={job.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold fs-5 shadow"
                  >
                    🚀 Post Job
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostJob;
