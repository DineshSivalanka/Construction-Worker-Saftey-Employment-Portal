import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  getApplicants,
  acceptApplicant,
  rejectApplicant,
} from "../../services/contractorService";
import { FaMapMarkerAlt, FaBriefcase, FaUsers, FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";

const Applicants = () => {
  const { t } = useTranslation();
  const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();
  
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();
  const [translatedApplicants, setTranslatedApplicants] = useState([]);

  const loadApplicants = async () => {
    try {
      const response = await getApplicants(jobId);
      setApplicants(response.data);
    } catch (error) {
      console.error(error);
      alert(t("contractorApplicants.failedToLoad"));
    }
  };

  useEffect(() => {
    if (applicants.length > 0) {
      translateAllApplicants();
    } else {
      setTranslatedApplicants([]);
    }
  }, [applicants, currentLang]);

  const translateAllApplicants = async () => {
    if (currentLang === 'en') {
      setTranslatedApplicants(applicants);
      return;
    }

    const newApps = await Promise.all(applicants.map(async (app) => {
      const workerName = app.worker ? app.worker.workerName : "Unknown Worker";
      const workerSkill = app.worker ? app.worker.skill : "N/A";
      const workerLocation = app.worker ? (app.worker.currentLocation || app.worker.address) : "N/A";
      
      const translatedName = await translate(workerName);
      const translatedSkill = await translate(workerSkill);
      const translatedLocation = await translate(workerLocation);
      const translatedStatus = await translate(app.status);
      
      return {
        ...app,
        translatedName,
        translatedSkill,
        translatedLocation,
        translatedStatus
      };
    }));
    setTranslatedApplicants(newApps);
  };

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const handleAccept = async (applicationId) => {
    try {
      await acceptApplicant(applicationId);
      alert(t("contractorApplicants.acceptSuccess"));
      loadApplicants();
    } catch (error) {
      console.error(error);
      alert(t("contractorApplicants.acceptError"));
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await rejectApplicant(applicationId);
      alert(t("contractorApplicants.rejectSuccess"));
      loadApplicants();
    } catch (error) {
      console.error(error);
      alert(t("contractorApplicants.rejectError"));
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-[#D8125B] fw-bold">👥 Job Applicants</h2>
          <button
            onClick={() => navigate("/contractor/my-jobs")}
            className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-4 py-2.5 font-semibold text-sm transition-all hover:bg-[#d97706] hover:text-white bg-white"
            style={{ border: '1px solid #d97706', color: '#d97706', height: '42px' }}
          >
            <FaArrowLeft /> Back to My Jobs
          </button>
          <h2 className="text-[#D8125B] fw-bold">{t("contractorApplicants.title")}</h2>
          <Link to="/contractor/my-jobs" className="btn btn-secondary fw-bold">
            {t("contractorApplicants.backToMyJobs")}
          </Link>
        </div>

        {isTranslating ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-[#D8125B] mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">{t("contractorApplicants.loadingTranslations")}</h5>
          </div>
        ) : translatedApplicants.length === 0 ? (
          <div className="text-center mt-5">
            <h4 className="text-muted">{t("contractorApplicants.noApplicants")}</h4>
          </div>
        ) : (
          <div className="row justify-content-start">
            {applicants.map((app) => (
              <div className="col-md-6 col-lg-4 mb-4" key={app.applicationId}>
                <div className="bg-[#FDF2F5] rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#D8125B]/20 d-flex flex-col justify-between h-100 position-relative" style={{ borderTop: '6px solid #D8125B', maxWidth: '430px' }}>
                  <div>
                    {/* Header: Name and Status */}
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                      <div className="text-truncate" style={{ maxWidth: '72%' }}>
                        <h4 className="fw-bold text-[#D8125B] mb-0 text-truncate" title={app.worker ? app.worker.workerName : "Unknown Worker"} style={{ fontSize: '1.2rem' }}>
                          👷 {app.worker ? app.worker.workerName : "Unknown Worker"}
                        </h4>
                        <small className="text-gray-500 fw-medium" style={{ fontSize: '0.85rem' }}>
                          Mobile: {app.worker ? app.worker.mobileNumber || "N/A" : "N/A"}
                        </small>
                      </div>
                      <span className={`badge text-white px-3 py-1.5 rounded-pill shadow-sm ${
                        app.status === "ACCEPTED" 
                          ? "bg-[#198754]" 
                          : app.status === "REJECTED" 
                          ? "bg-[#dc3545]" 
                          : "bg-secondary"
                      }`} style={{ fontSize: '0.85rem' }}>
                        {app.status}
          <div className="row">
            {translatedApplicants.map((app) => (
              <div className="col-md-6 mb-4" key={app.applicationId}>
                <div className="card shadow-sm border-0 h-100 rounded-4">
                  <div className="card-header bg-dark text-gray-900 rounded-top-4 py-3">
                    <h5 className="mb-0 text-white">
                      👷 {app.translatedName || (app.worker ? app.worker.workerName : t("contractorApplicants.unknownWorker"))}
                    </h5>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>{t("contractorApplicants.skill")}:</strong>{" "}
                      <span className="badge bg-warning text-dark">
                        {app.translatedSkill || (app.worker ? app.worker.skill : t("contractorApplicants.notAvailable"))}
                      </span>
                    </p>
                    <p>
                      <strong>{t("contractorApplicants.experience")}:</strong>{" "}
                      {app.worker ? app.worker.experienceYears : 0} {t("contractorApplicants.years")}
                    </p>
                    <p>
                      <strong>{t("contractorApplicants.location")}:</strong>{" "}
                      {app.translatedLocation || (app.worker ? app.worker.currentLocation || app.worker.address : t("contractorApplicants.notAvailable"))}
                    </p>
                    <p>
                      <strong>{t("contractorApplicants.status")}:</strong>{" "}
                      <span
                        className={`badge ${
                          app.status === "ACCEPTED"
                            ? "bg-success"
                            : app.status === "REJECTED"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {app.translatedStatus || app.status}
                      </span>
                    </div>

                    {/* Details 2x2 Grid */}
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <div className="d-flex align-items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 text-truncate" style={{ height: '38px' }}>
                          <FaMapMarkerAlt className="text-gray-400 shrink-0" size={13} />
                          <span className="small text-truncate text-gray-700 fw-semibold" style={{ fontSize: '0.8rem' }} title={app.worker ? app.worker.currentLocation || app.worker.address : "N/A"}>
                            {app.worker ? app.worker.currentLocation || app.worker.address : "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 text-truncate" style={{ height: '38px' }}>
                          <FaBriefcase className="text-purple-500 shrink-0" size={13} />
                          <span className="small text-truncate text-purple-800 fw-semibold" style={{ fontSize: '0.8rem' }} title={app.worker ? app.worker.skill : "N/A"}>
                            {app.worker ? app.worker.skill : "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 text-truncate" style={{ height: '38px' }}>
                          <FaUsers className="text-blue-500 shrink-0" size={13} />
                          <span className="small text-truncate text-blue-800 fw-semibold" style={{ fontSize: '0.8rem' }}>
                            {app.worker ? app.worker.experienceYears : 0} Yrs Experience
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div>
                    <hr className="border-gray-100 my-3" />
                    {app.status === "PENDING" ? (
                      <div className="d-flex justify-content-between gap-2 mt-2">
                        <button
                          className="btn btn-sm text-white d-flex align-items-center gap-1.5 rounded-xl px-3 py-2 font-bold text-xs border-0 hover:bg-[#157347] flex-grow-1 justify-content-center"
                          onClick={() => handleAccept(app.applicationId)}
                          style={{ backgroundColor: '#198754', height: '38px' }}
                        >
                          <FaCheck size={11} /> Accept
                          {t("contractorApplicants.accept")}
                        </button>

                        <button
                          className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-3 py-2 font-semibold text-xs border-0 transition-all hover:bg-red-200 flex-grow-1 justify-content-center"
                          onClick={() => handleReject(app.applicationId)}
                          style={{ backgroundColor: '#fee2e2', color: '#dc2626', height: '38px' }}
                        >
                          <FaTimes size={11} /> Reject
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-muted py-1">
                        <em className="small fw-semibold">Action already taken</em>
                          {t("contractorApplicants.reject")}
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-muted">
                        <em>{t("contractorApplicants.actionTaken")}</em>
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
