import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getJobs, deleteJob } from "../../services/adminService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";

function AdminJobs() {
  const { t } = useTranslation();
  const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();
  
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
      const translatedTitle = job.jobTitle ? await translate(job.jobTitle) : null;
      const contractorName = job.contractor ? job.contractor.contractorName : "N/A";
      const translatedContractor = await translate(contractorName);
      const translatedLocation = job.location ? await translate(job.location) : null;
      const translatedStatus = job.status ? await translate(job.status) : null;
      
      return {
        ...job,
        translatedTitle,
        translatedContractor,
        translatedLocation,
        translatedStatus
      };
    }));
    setTranslatedJobs(newJobs);
  };

  const loadJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to load jobs", error);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm(t("adminJobs.deleteConfirm"))) return;
    try {
      await deleteJob(jobId);
      alert(t("adminJobs.deleteSuccess"));
      loadJobs();
    } catch (error) {
      console.error("Failed to delete job", error);
      alert(t("adminJobs.deleteError"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-success fw-bold">{t("adminJobs.title")}</h2>
          <Link to="/admin/dashboard" className="btn btn-secondary fw-bold">
            {t("adminJobs.backToDashboard")}
          </Link>
        </div>

        {isTranslating ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-[#D8125B] mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">{t("adminJobs.loadingTranslations")}</h5>
          </div>
        ) : translatedJobs.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm py-4">
            <h4 className="mb-0">{t("adminJobs.noJobs")}</h4>
          </div>
        ) : (
          <div className="table-responsive shadow rounded-4">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>{t("adminJobs.jobTitle")}</th>
                  <th>{t("adminJobs.contractor")}</th>
                  <th>{t("adminJobs.location")}</th>
                  <th>{t("adminJobs.salary")}</th>
                  <th>{t("adminJobs.status")}</th>
                  <th>{t("adminJobs.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {translatedJobs.map((job) => (
                  <tr key={job.jobId}>
                    <td className="fw-bold">{job.translatedTitle || job.jobTitle || t("adminJobs.notAvailable")}</td>
                    <td>{job.translatedContractor || (job.contractor ? job.contractor.contractorName : t("adminJobs.notAvailable"))}</td>
                    <td>{job.translatedLocation || job.location || t("adminJobs.notAvailable")}</td>
                    <td>₹{job.salary || 0}</td>
                    <td>
                      <span className={`badge ${job.status === "OPEN" ? "bg-success" : "bg-danger"}`}>
                        {job.translatedStatus || job.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm fw-bold"
                        onClick={() => handleDelete(job.jobId)}
                      >
                        {t("adminJobs.delete")}
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
