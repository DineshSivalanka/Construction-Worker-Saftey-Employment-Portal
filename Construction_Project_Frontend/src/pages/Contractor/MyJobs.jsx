import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getMyJobs, deleteJob } from "../../services/contractorService";
import { FaMapMarkerAlt, FaMoneyBillWave, FaUsers, FaEdit, FaUserCheck, FaTrash, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
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
          <h2 className="text-[#D8125B] fw-bold">{t("contractorMyJobs.title", "My Posted Jobs")}</h2>
          <Link to="/contractor/post-job" className="btn btn-warning fw-bold px-4 rounded-xl">
            {t("contractorMyJobs.postNewJob", "Post New Job")}
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
          <div className="row justify-content-start">
            {translatedJobs.map((job) => (
              <div className="col-md-6 col-lg-4 mb-4" key={job.jobId}>
                <div className="bg-[#FDF2F5] rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#D8125B]/20 d-flex flex-col justify-between h-100 position-relative" style={{ borderTop: '6px solid #D8125B', maxWidth: '430px' }}>
                  <div>
                    {/* Header: Title and Status */}
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                      <div className="text-truncate" style={{ maxWidth: '72%' }}>
                        <h4 className="fw-bold text-[#D8125B] mb-0 text-truncate" title={job.translatedTitle || job.jobTitle} style={{ fontSize: '1.2rem' }}>
                          {job.translatedTitle || job.jobTitle}
                        </h4>
                        <small className="text-gray-500 fw-medium" style={{ fontSize: '0.85rem' }}>
                          {job.workingHours || "Full Time"}
                        </small>
                      </div>
                      <span className={`badge text-white px-3 py-1.5 rounded-pill shadow-sm ${
                        job.status === "OPEN" ? "bg-[#198754]" : "bg-[#dc3545]"
                      }`} style={{ fontSize: '0.85rem' }}>
                        {job.translatedStatus || job.status}
                      </span>
                    </div>

                    {/* Job Details 2x2 Grid */}
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <div className="d-flex align-items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 text-truncate" style={{ height: '38px' }}>
                          <FaMapMarkerAlt className="text-gray-400 shrink-0" size={13} />
                          <span className="small text-truncate text-gray-700 fw-semibold" style={{ fontSize: '0.8rem' }} title={job.translatedLocation || job.location}>
                            {job.translatedLocation || job.location}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 text-truncate" style={{ height: '38px' }}>
                          <FaMoneyBillWave className="text-emerald-500 shrink-0" size={13} />
                          <span className="small text-truncate text-emerald-800 fw-bold" style={{ fontSize: '0.8rem' }}>
                            ₹{job.salary}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 text-truncate" style={{ height: '38px' }}>
                          <FaUsers className="text-blue-500 shrink-0" size={13} />
                          <span className="small text-truncate text-blue-800 fw-semibold" style={{ fontSize: '0.8rem' }}>
                            {job.workersRequired} {t("contractorMyJobs.workersNeeded", "Workers")}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 text-truncate" style={{ height: '38px' }}>
                          <FaBriefcase className="text-purple-500 shrink-0" size={13} />
                          <span className="small text-truncate text-purple-800 fw-semibold" style={{ fontSize: '0.8rem' }}>
                            {job.experienceRequired || 0} {t("contractorMyJobs.experience", "Yrs Exp")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div>
                    <hr className="border-gray-100 my-3" />
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <Link 
                        to={`/contractor/edit-job/${job.jobId}`} 
                        className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-3 py-2 font-semibold text-xs transition-all hover:bg-[#d97706] hover:text-white bg-white"
                        style={{ border: '1px solid #d97706', color: '#d97706', height: '38px' }}
                      >
                        {t("contractorMyJobs.edit", "Edit")}
                      </Link>
                      <Link 
                        to={`/contractor/applicants/${job.jobId}`} 
                        className="btn btn-sm text-[#212529] d-flex align-items-center gap-1.5 rounded-xl px-3.5 py-2 font-bold text-xs transition-all shadow-sm flex-grow-1 justify-content-center border-0 hover:bg-[#e0a800]"
                        style={{ backgroundColor: '#ffc107', height: '38px' }}
                      >
                        {t("contractorMyJobs.viewApplicants", "View Applicants")}
                      </Link>
                      <button 
                        className="btn btn-sm d-flex align-items-center justify-content-center rounded-xl border-0 transition-all hover:bg-red-100"
                        onClick={() => handleDelete(job.jobId)}
                        title="Delete Job"
                        style={{ 
                          backgroundColor: '#fee2e2', 
                          color: '#dc2626', 
                          width: '38px', 
                          height: '38px', 
                          minWidth: '38px' 
                        }}
                      >
                        <FaTrash size={12} />
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
