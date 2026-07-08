import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getMyJobs, deleteJob } from "../../services/contractorService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";

function MyJobs() {
  const { t } = useTranslation();
  const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();
  
  const contractorId = localStorage.getItem("userId");
  const [jobs, setJobs] = useState([]);
  const [translatedJobs, setTranslatedJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      translateAllJobs();
    } else {
      setTranslatedJobs([]);
    }
  }, [jobs, currentLang]);

  const translateAllJobs = async () => {
    if (currentLang === 'en') {
      setTranslatedJobs(jobs);
      return;
    }

    const newJobs = await Promise.all(jobs.map(async (job) => {
      const translatedTitle = await translate(job.jobTitle);
      const translatedLocation = await translate(job.location);
      const translatedStatus = await translate(job.status);
      return {
        ...job,
        translatedTitle,
        translatedLocation,
        translatedStatus
      };
    }));
    setTranslatedJobs(newJobs);
  };

  const loadJobs = async () => {
    try {
      const response = await getMyJobs(contractorId);
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm(t("contractorMyJobs.deleteConfirm"))) {
      try {
        await deleteJob(jobId);
        alert(t("contractorMyJobs.deleteSuccess"));
        loadJobs(); // Refresh the list
      } catch (error) {
        console.error(error);
        alert(t("contractorMyJobs.deleteError"));
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-[#D8125B] fw-bold">{t("contractorMyJobs.title")}</h2>
          <Link to="/contractor/post-job" className="btn btn-warning fw-bold">
            {t("contractorMyJobs.postNewJob")}
          </Link>
        </div>

        {isTranslating ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-[#D8125B] mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">{t("contractorMyJobs.loadingTranslations")}</h5>
          </div>
        ) : translatedJobs.length === 0 ? (
          <div className="text-center mt-5">
            <h4 className="text-muted">{t("contractorMyJobs.noJobs")}</h4>
          </div>
        ) : (
          <div className="row">
            {translatedJobs.map((job) => (
              <div className="col-md-6 mb-4" key={job.jobId}>
                <div className="card shadow-sm border-0 h-100 rounded-4">
                  <div className="card-header bg-dark text-gray-900 rounded-top-4 py-3">
                    <h5 className="mb-0 text-white">{job.translatedTitle || job.jobTitle}</h5>
                  </div>
                  <div className="card-body">
                    <p><strong>{t("contractorMyJobs.location")}:</strong> {job.translatedLocation || job.location}</p>
                    <p><strong>{t("contractorMyJobs.salary")}:</strong> ₹ {job.salary}</p>
                    <p><strong>{t("contractorMyJobs.workersNeeded")}:</strong> {job.workersRequired}</p>
                    <p><strong>{t("contractorMyJobs.status")}:</strong> {job.translatedStatus || job.status}</p>
                    <hr />
                    <div className="d-flex justify-content-between mt-3">
                      <Link to={`/contractor/edit-job/${job.jobId}`} className="btn btn-primary text-gray-900">
                        {t("contractorMyJobs.edit")}
                      </Link>
                      <Link to={`/contractor/applicants/${job.jobId}`} className="btn btn-success text-gray-900">
                        {t("contractorMyJobs.viewApplicants")}
                      </Link>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(job.jobId)}
                      >
                        {t("contractorMyJobs.delete")}
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
