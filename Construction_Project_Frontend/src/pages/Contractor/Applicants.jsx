import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  getApplicants,
  acceptApplicant,
  rejectApplicant,
  getMyJobs,
} from "../../services/contractorService";
import { FaMapMarkerAlt, FaBriefcase, FaUsers, FaCheck, FaTimes, FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
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
      if (jobId && jobId !== "all") {
        const response = await getApplicants(jobId);
        setApplicants(response.data);
      } else {
        const contractorId = localStorage.getItem("userId");
        if (!contractorId) {
          console.error("Contractor ID not found in localStorage");
          return;
        }
        // Fetch all jobs for this contractor
        const jobsResponse = await getMyJobs(contractorId);
        const jobsList = jobsResponse.data || [];
        
        // Fetch applicants for all jobs
        const applicantsPromises = jobsList.map((job) =>
          getApplicants(job.jobId)
            .then((res) => {
              // Attach the job details explicitly to each application just in case
              return (res.data || []).map((app) => ({
                ...app,
                job: app.job || job,
              }));
            })
            .catch((err) => {
              console.error(`Error fetching applicants for job ${job.jobId}:`, err);
              return [];
            })
        );
        
        const results = await Promise.all(applicantsPromises);
        const allApplicants = results.flat();
        setApplicants(allApplicants);
      }
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
      const englishApps = applicants.map((app) => {
        const workerName = app.worker && app.worker.workerName && app.worker.workerName.trim() 
          ? app.worker.workerName 
          : t("contractorApplicants.unknownWorker", "Unknown Worker");
        const workerSkill = app.worker && app.worker.skill && app.worker.skill.trim() 
          ? app.worker.skill 
          : t("contractorApplicants.na", "N/A");
        const workerLocation = app.worker && (app.worker.currentLocation || app.worker.address) && (app.worker.currentLocation || app.worker.address).trim()
          ? (app.worker.currentLocation || app.worker.address)
          : t("contractorApplicants.na", "N/A");
        const mobileNumber = app.worker && app.worker.user && app.worker.user.mobileNumber 
          ? app.worker.user.mobileNumber 
          : "N/A";
        const jobTitle = app.job && app.job.jobTitle ? app.job.jobTitle : "";
        const jobLocation = app.job && app.job.location ? app.job.location : "";
        
        return {
          ...app,
          translatedName: workerName,
          translatedSkill: workerSkill,
          translatedLocation: workerLocation,
          mobileNumber: mobileNumber,
          translatedJobTitle: jobTitle,
          translatedJobLocation: jobLocation
        };
      });
      setTranslatedApplicants(englishApps);
      return;
    }

    const newApps = await Promise.all(applicants.map(async (app) => {
      const workerName = app.worker && app.worker.workerName && app.worker.workerName.trim() 
        ? app.worker.workerName 
        : "Unknown Worker";
      const workerSkill = app.worker && app.worker.skill && app.worker.skill.trim() 
        ? app.worker.skill 
        : "N/A";
      const workerLocation = app.worker && (app.worker.currentLocation || app.worker.address) && (app.worker.currentLocation || app.worker.address).trim()
        ? (app.worker.currentLocation || app.worker.address)
        : "N/A";
      const mobileNumber = app.worker && app.worker.user && app.worker.user.mobileNumber 
        ? app.worker.user.mobileNumber 
        : "N/A";
      
      const translatedName = await translate(workerName);
      const translatedSkill = await translate(workerSkill);
      const translatedLocation = await translate(workerLocation);
      const translatedStatus = await translate(app.status);
      const translatedJobTitle = app.job && app.job.jobTitle ? await translate(app.job.jobTitle) : "";
      const translatedJobLocation = app.job && app.job.location ? await translate(app.job.location) : "";
      
      return {
        ...app,
        translatedName,
        translatedSkill,
        translatedLocation,
        translatedStatus,
        mobileNumber,
        translatedJobTitle,
        translatedJobLocation
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
          <h2 className="text-[#D8125B] fw-bold">
            {jobId && jobId !== "all"
              ? t("contractorApplicants.title", "👥 Job Applicants")
              : t("contractorApplicants.allTitle", "👥 All Job Applicants")}
          </h2>
          <button
            onClick={() => navigate(jobId && jobId !== "all" ? "/contractor/my-jobs" : "/contractor/dashboard")}
            className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-4 py-2.5 font-semibold text-sm transition-all hover:bg-[#d97706] hover:text-white bg-white"
            style={{ border: '1px solid #d97706', color: '#d97706', height: '42px' }}
          >
            <FaArrowLeft size={12} className="shrink-0" />
            <span>
              {jobId && jobId !== "all" 
                ? t("contractorApplicants.backToMyJobs", "Back to My Jobs") 
                : t("contractorApplicants.backToDashboard", "Back to Dashboard")}
            </span>
          </button>
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
            <h4 className="text-muted">
              {jobId && jobId !== "all"
                ? t("contractorApplicants.noApplicants", "No applicants found for this job.")
                : t("contractorApplicants.noAllApplicants", "No applicants found for any of your jobs.")}
            </h4>
          </div>
        ) : (
          <div className="row justify-content-start">
            {translatedApplicants.map((app) => (
              <div className="col-md-6 col-lg-4 mb-4" key={app.applicationId}>
                <div className="bg-[#FDF2F5] rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#D8125B]/20 d-flex flex-col justify-between h-100 position-relative" style={{ borderTop: '6px solid #D8125B', maxWidth: '430px' }}>
                  <div>
                    {/* Header: Name and Status */}
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <h4 className="fw-bold text-[#D8125B] mb-0" title={app.translatedName} style={{ fontSize: '1.1rem' }}>
                          👷 {app.translatedName}
                        </h4>
                        <small className="text-gray-500 fw-medium" style={{ fontSize: '0.85rem' }}>
                          Mobile: {app.mobileNumber}
                        </small>
                      </div>
                      <span className={`badge text-white px-3 py-1.5 rounded-pill shadow-sm shrink-0 ${
                        app.status === "ACCEPTED" 
                          ? "bg-[#198754]" 
                          : app.status === "REJECTED" 
                          ? "bg-[#dc3545]" 
                          : "bg-secondary"
                      }`} style={{ fontSize: '0.85rem' }}>
                        {app.translatedStatus || app.status}
                      </span>
                    </div>

                    {/* Job Details Section */}
                    {app.job && (
                      <div className="mb-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-muted small fw-bold text-uppercase mb-1 tracking-wider" style={{ fontSize: '0.7rem' }}>
                          💼 {t("contractorApplicants.appliedJob", "Applied Job")}
                        </div>
                        <h5 className="fw-bold text-[#D8125B] mb-1 text-truncate" title={app.translatedJobTitle || app.job.jobTitle} style={{ fontSize: '0.95rem' }}>
                          {app.translatedJobTitle || app.job.jobTitle}
                        </h5>
                        <div className="d-flex flex-wrap gap-x-3 gap-y-1 text-gray-600 mt-1" style={{ fontSize: '0.75rem' }}>
                          <span className="text-truncate" style={{ maxWidth: '120px' }} title={app.translatedJobLocation || app.job.location}>
                            📍 {app.translatedJobLocation || app.job.location}
                          </span>
                          <span>💰 ₹{app.job.salary}</span>
                          <span>🕒 {app.job.workingHours || "Full Time"}</span>
                        </div>
                      </div>
                    )}

                    {/* Worker Details Section */}
                    <div className="mb-1 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-muted small fw-bold text-uppercase mb-1 tracking-wider" style={{ fontSize: '0.7rem' }}>
                        👤 {t("contractorApplicants.applicantDetails", "Applicant Info")}
                      </div>
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center gap-1.5 text-truncate" style={{ height: '24px' }}>
                            <FaMapMarkerAlt className="text-gray-400 shrink-0" size={12} />
                            <span className="small text-truncate text-gray-700 fw-semibold" style={{ fontSize: '0.75rem' }} title={app.translatedLocation}>
                              {app.translatedLocation}
                            </span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center gap-1.5 text-truncate" style={{ height: '24px' }}>
                            <FaBriefcase className="text-purple-500 shrink-0" size={12} />
                            <span className="small text-truncate text-purple-800 fw-semibold" style={{ fontSize: '0.75rem' }} title={app.translatedSkill}>
                              {app.translatedSkill}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 mt-1">
                          <div className="d-flex align-items-center gap-1.5 text-truncate" style={{ height: '24px' }}>
                            <FaUsers className="text-blue-500 shrink-0" size={12} />
                            <span className="small text-truncate text-blue-800 fw-semibold" style={{ fontSize: '0.75rem' }}>
                              {app.worker ? app.worker.experienceYears : 0} {t("contractorApplicants.years", "Yrs Experience")}
                            </span>
                          </div>
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
                          <FaCheck size={11} /> {t("contractorApplicants.accept", "Accept")}
                        </button>

                        <button
                          className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-3 py-2 font-semibold text-xs border-0 transition-all hover:bg-red-200 flex-grow-1 justify-content-center"
                          onClick={() => handleReject(app.applicationId)}
                          style={{ backgroundColor: '#fee2e2', color: '#dc2626', height: '38px' }}
                        >
                          <FaTimes size={11} /> {t("contractorApplicants.reject", "Reject")}
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-muted py-1">
                        <em className="small fw-semibold">{t("contractorApplicants.actionTaken", "Action already taken")}</em>
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
