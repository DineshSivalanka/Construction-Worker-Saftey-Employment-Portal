import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { createJob } from "../../services/contractorService";
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
            <div className="card shadow-lg border-0 rounded-4">
              <div
                className="card-header text-gray-900 rounded-top-4 py-3"
                style={{
                  background: "linear-gradient(135deg, #ff9800, #ff5722)",
                }}
              >
                <h3 className="mb-0 text-center fw-bold">{t("contractorPostJob.title")}</h3>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">{t("contractorPostJob.jobTitle")}</label>
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        placeholder={t("contractorPostJob.jobTitlePlaceholder")}
                        value={job.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">{t("contractorPostJob.location")}</label>
                      <input
                        type="text"
                        className="form-control"
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
                      <label className="form-label fw-bold">{t("contractorPostJob.workingHours")}</label>
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
                      <label className="form-label fw-bold">{t("contractorPostJob.salary")}</label>
                      <input
                        type="number"
                        className="form-control"
                        name="salary"
                        placeholder={t("contractorPostJob.salaryPlaceholder")}
                        value={job.salary}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">{t("contractorPostJob.workersRequired")}</label>
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
                    <label className="form-label fw-bold">{t("contractorPostJob.experienceRequired")}</label>
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
                    <label className="form-label fw-bold">{t("contractorPostJob.description")}</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="4"
                      placeholder={t("contractorPostJob.descriptionPlaceholder")}
                      value={job.description}
                      onChange={handleChange}
                      required
                    ></textarea>
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
