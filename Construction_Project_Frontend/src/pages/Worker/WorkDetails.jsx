import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getWorkerProfile, getMyApplications } from "../../services/workerService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";
import {
  FaArrowLeft,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTools,
  FaUserCircle,
  FaBuilding,
  FaMoneyBillWave,
  FaClock
} from "react-icons/fa";

function WorkDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();
  const workerId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [workHistory, setWorkHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Profile
        const profileRes = await getWorkerProfile(workerId);
        setProfile(profileRes.data);

        // Fetch Applications and filter ACCEPTED ones
        const appsRes = await getMyApplications(workerId);
        const acceptedApps = appsRes.data.filter(app => app.status === "ACCEPTED");

        // Translate accepted jobs
        if (currentLang === "en") {
          setWorkHistory(acceptedApps);
        } else {
          const translatedHistory = await Promise.all(
            acceptedApps.map(async (app) => {
              const jobTitle = app.job ? app.job.jobTitle : "Unknown Job";
              const jobLocation = app.job ? app.job.location : "N/A";
              const translatedTitle = await translate(jobTitle);
              const translatedLocation = await translate(jobLocation);
              return {
                ...app,
                translatedTitle,
                translatedLocation
              };
            })
          );
          setWorkHistory(translatedHistory);
        }
      } catch (err) {
        console.error("Failed to load work details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (workerId) {
      fetchData();
    }
  }, [workerId, currentLang]);

  const getSkillTranslationKey = (skill) => {
    if (!skill) return "";
    const formatted = skill.replace(/\s+/g, '');
    return formatted.charAt(0).toLowerCase() + formatted.slice(1);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-[#0D9488]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/worker/dashboard")}
          className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-4 py-2.5 font-semibold text-sm transition-all hover:bg-[#0D9488] hover:text-white bg-white mb-5 shadow-xs"
          style={{ border: '1px solid #0D9488', color: '#0D9488', height: '42px' }}
        >
          <FaArrowLeft size={12} className="shrink-0" />
          <span>{t("workerWorkDetails.backToDashboard", "Back to Dashboard")}</span>
        </button>

        <div className="row g-4">
          
          {/* Left Column: Worker Summary Card */}
          <div className="col-lg-4">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200 border-t-8 border-t-[#0D9488]">
              <div className="text-center pb-4 mb-4 border-b border-gray-100">
                <div className="bg-teal-50 text-[#0D9488] p-4 rounded-3xl d-inline-flex mb-3 shadow-xs">
                  <FaUserCircle size={48} />
                </div>
                <h3 className="fw-bold text-gray-900 mb-1">{profile?.workerName}</h3>
                <span className="badge text-white px-3 py-1.5 rounded-pill shadow-xs bg-[#0D9488]" style={{ fontSize: '0.8rem' }}>
                  👷 {t("workerProfile.roleWorker", "Registered Worker")}
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="d-flex align-items-center gap-3 bg-teal-50/50 p-2.5 rounded-2xl border border-teal-50">
                  <div className="bg-white p-2 rounded-xl text-[#0D9488] shadow-xs">
                    <FaTools size={14} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block" style={{ fontSize: '0.65rem' }}>{t("workerProfile.skillLabel", "Skill")}</span>
                    <span className="text-sm font-bold text-gray-800">
                      {t(`workerProfile.${getSkillTranslationKey(profile?.skill)}`, profile?.skill)}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 bg-teal-50/50 p-2.5 rounded-2xl border border-teal-50">
                  <div className="bg-white p-2 rounded-xl text-[#0D9488] shadow-xs">
                    <FaBriefcase size={14} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block" style={{ fontSize: '0.65rem' }}>{t("workerProfile.experience", "Experience")}</span>
                    <span className="text-sm font-bold text-gray-800">{profile?.experienceYears} {t("workerProfile.years", "Years")}</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 bg-teal-50/50 p-2.5 rounded-2xl border border-teal-50">
                  <div className="bg-white p-2 rounded-xl text-[#0D9488] shadow-xs">
                    <FaCalendarAlt size={14} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block" style={{ fontSize: '0.65rem' }}>{t("workerProfile.age", "Age")}</span>
                    <span className="text-sm font-bold text-gray-800">{profile?.age} {t("workerProfile.yearsOld", "Years Old")}</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 bg-teal-50/50 p-2.5 rounded-2xl border border-teal-50">
                  <div className="bg-white p-2 rounded-xl text-[#0D9488] shadow-xs">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block" style={{ fontSize: '0.65rem' }}>{t("workerProfile.currentLocation", "Current Location")}</span>
                    <span className="text-sm font-bold text-gray-800">{profile?.currentLocation || t("workerProfile.notSpecified", "Not Specified")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Work History Details */}
          <div className="col-lg-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 border-t-8 border-t-[#0D9488] h-100">
              <h3 className="fw-bold text-[#0D9488] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                <FaBriefcase />
                {t("workerWorkDetails.historyTitle", "Previous Work History & Completed Jobs")}
              </h3>

              {isTranslating ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-[#0D9488] mb-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h6 className="text-muted">{t("workerJobs.loadingTranslations", "Translating history...")}</h6>
                </div>
              ) : workHistory.length === 0 ? (
                <div className="bg-[#EAF8F7] text-teal-800 p-5 rounded-3xl border border-[#0D9488]/15 text-center mt-4">
                  <h5 className="fw-bold mb-2">📋 {t("workerWorkDetails.emptyTitle", "No Work History Yet")}</h5>
                  <p className="text-sm mb-0 text-gray-600 leading-relaxed">
                    {t("workerWorkDetails.emptyDesc", "You do not have any accepted job postings on the platform yet. Once a contractor approves your job application, it will appear here as part of your completed work credentials.")}
                  </p>
                </div>
              ) : (
                <div className="row g-3 mt-1">
                  {workHistory.map((app) => (
                    <div className="col-md-6" key={app.applicationId}>
                      <div className="bg-[#EAF8F7] rounded-3xl p-4 shadow-sm border border-[#0D9488]/20 d-flex flex-col justify-between h-100">
                        <div>
                          <h5 className="fw-bold text-[#0D9488] mb-1 text-truncate" title={app.translatedTitle || app.job?.jobTitle}>
                            💼 {app.translatedTitle || app.job?.jobTitle}
                          </h5>
                          <p className="text-xs text-gray-500 font-bold mb-3 flex items-center gap-1.5">
                            <FaBuilding />
                            {app.job?.contractor?.contractorName || t("workerJobs.unknown")}
                          </p>

                          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs space-y-1.5">
                            <div className="d-flex justify-content-between text-xs">
                              <span className="text-gray-400 font-bold uppercase">{t("workerJobs.location")}</span>
                              <span className="font-semibold text-gray-800 truncate max-w-[120px]">{app.translatedLocation || app.job?.location}</span>
                            </div>
                            <div className="d-flex justify-content-between text-xs">
                              <span className="text-gray-400 font-bold uppercase">{t("workerJobs.workingHours")}</span>
                              <span className="font-semibold text-gray-800">{app.job?.workingHours} Hrs</span>
                            </div>
                            <div className="d-flex justify-content-between text-xs">
                              <span className="text-gray-400 font-bold uppercase">{t("workerJobs.salary")}</span>
                              <span className="font-semibold text-gray-800">₹{app.job?.salary}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3.5 pt-2 border-t border-[#0D9488]/10 d-flex align-items-center justify-between">
                          <span className="text-xs text-gray-400 font-bold uppercase">Status</span>
                          <span className="badge bg-success text-white px-2.5 py-1 rounded-pill" style={{ fontSize: '0.7rem' }}>
                            {t("workerWorkDetails.statusHired", "Hired / Active")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default WorkDetails;
