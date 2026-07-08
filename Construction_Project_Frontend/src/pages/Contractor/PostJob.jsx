import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { createJob } from "../../services/contractorService";
import { FaBriefcase, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function PostJob() {
  const { t } = useTranslation();
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
      alert(t("contractorPostJob.success"));
      navigate("/contractor/my-jobs");
    } catch (error) {
      console.error(error);
      alert(t("contractorPostJob.error"));
    }
  };

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
                  <FaBriefcase /> Post New Job
                </h3>
            <div className="card shadow-lg border-0 rounded-4">
              <div
                className="card-header text-gray-900 rounded-top-4 py-3"
                style={{
                  background: "linear-gradient(135deg, #ff9800, #ff5722)",
                }}
              >
                <h3 className="mb-0 text-center fw-bold">{t("contractorPostJob.title")}</h3>
              </div>

              <div className="card-body p-0">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-gray-700">Job Title</label>
                      <label className="form-label fw-bold">{t("contractorPostJob.jobTitle")}</label>
                      <input
                        type="text"
                        className="form-control rounded-xl border-gray-200"
                        name="jobTitle"
                        placeholder={t("contractorPostJob.jobTitlePlaceholder")}
                        value={job.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-gray-700">Location</label>
                      <label className="form-label fw-bold">{t("contractorPostJob.location")}</label>
                      <input
                        type="text"
                        className="form-control rounded-xl border-gray-200"
                        name="location"
                        placeholder={t("contractorPostJob.locationPlaceholder")}
                        value={job.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold text-gray-700">Working Hours</label>
                      <label className="form-label fw-bold">{t("contractorPostJob.workingHours")}</label>
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
                      <label className="form-label fw-bold">{t("contractorPostJob.salary")}</label>
                      <input
                        type="number"
                        className="form-control rounded-xl border-gray-200"
                        name="salary"
                        placeholder={t("contractorPostJob.salaryPlaceholder")}
                        value={job.salary}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold text-gray-700">Workers Required</label>
                      <label className="form-label fw-bold">{t("contractorPostJob.workersRequired")}</label>
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

                  <div className="mb-3">
                    <label className="form-label fw-bold text-gray-700">Minimum Experience Required (Years)</label>
                    <label className="form-label fw-bold">{t("contractorPostJob.experienceRequired")}</label>
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

                  <div className="mb-4">
                    <label className="form-label fw-bold text-gray-700">Job Description</label>
                    <label className="form-label fw-bold">{t("contractorPostJob.description")}</label>
                    <textarea
                      className="form-control rounded-xl border-gray-200"
                      name="description"
                      rows="4"
                      placeholder={t("contractorPostJob.descriptionPlaceholder")}
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
                      <FaPaperPlane /> Post Job
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold fs-5 shadow"
                  >
                    {t("contractorPostJob.postJobButton")}
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
