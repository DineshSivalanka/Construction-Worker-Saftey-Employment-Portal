import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getContractorProfile, getMyJobs } from "../../services/contractorService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";
import {
  FaArrowLeft,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClipboardList,
  FaTrophy,
  FaBriefcase
} from "react-icons/fa";

function ContractExperience() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { translate, currentLang } = useDynamicTranslation();
  const contractorId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);
  const [translatedWorkDetails, setTranslatedWorkDetails] = useState("");
  const [translatedLocation, setTranslatedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getContractorProfile(contractorId);
        const profileData = profileRes.data;
        setProfile(profileData);

        // Translate location details
        if (profileData && profileData.district) {
          const fullLocation = `${profileData.village ? profileData.village + ", " : ""}${profileData.district}`;
          if (currentLang === "en") {
            setTranslatedLocation(fullLocation);
          } else {
            const translatedLoc = await translate(fullLocation);
            setTranslatedLocation(translatedLoc);
          }
        } else {
          setTranslatedLocation("");
        }

        // Translate previous work details text
        if (profileData && profileData.previousWorkDetails) {
          if (currentLang === "en") {
            setTranslatedWorkDetails(profileData.previousWorkDetails);
          } else {
            const translatedText = await translate(profileData.previousWorkDetails);
            setTranslatedWorkDetails(translatedText);
          }
        } else {
          setTranslatedWorkDetails("");
        }

        const jobsRes = await getMyJobs(contractorId);
        const jobsList = jobsRes.data || [];
        // Translate active jobs
        if (currentLang === "en") {
          setActiveJobs(jobsList);
        } else {
          const translatedJobs = await Promise.all(
            jobsList.map(async (job) => {
              const translatedTitle = await translate(job.jobTitle);
              const translatedLocation = await translate(job.location);
              return {
                ...job,
                translatedTitle,
                translatedLocation
              };
            })
          );
          setActiveJobs(translatedJobs);
        }
      } catch (err) {
        console.error("Failed to load contractor experience details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (contractorId) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [contractorId, currentLang]);

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-[#D8125B]" role="status">
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
          onClick={() => navigate("/contractor/dashboard")}
          className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-4 py-2.5 font-semibold text-sm transition-all hover:bg-[#D8125B] hover:text-white bg-white mb-5 shadow-xs"
          style={{ border: '1px solid #D8125B', color: '#D8125B', height: '42px' }}
        >
          <FaArrowLeft size={12} className="shrink-0" />
          <span>{t("contractExperience.backToDashboard")}</span>
        </button>

        <div className="row g-4">
          
          {/* Left Column: Contractor Summary Card */}
          <div className="col-lg-4">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200 border-t-8 border-t-[#D8125B]">
              <div className="text-center pb-4 mb-4 border-b border-gray-100">
                <div className="bg-[#FFF5F6] text-[#D8125B] p-4 rounded-3xl d-inline-flex mb-3 shadow-xs">
                  <FaBuilding size={48} />
                </div>
                <h3 className="fw-bold text-gray-900 mb-1">{profile?.contractorName}</h3>
                <span className="badge text-white px-3 py-1.5 rounded-pill shadow-xs bg-[#D8125B]" style={{ fontSize: '0.8rem' }}>
                  🏢 {t("contractExperience.roleContractor")}
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="d-flex align-items-center gap-3 bg-[#FFF5F6]/55 p-2.5 rounded-2xl border border-[#FFF5F6]">
                  <div className="bg-white p-2 rounded-xl text-[#D8125B] shadow-xs">
                    <FaCalendarAlt size={14} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block" style={{ fontSize: '0.65rem' }}>{t("contractorProfile.experience")}</span>
                    <span className="text-sm font-bold text-gray-800">
                      {profile?.experienceYears} {t("contractorProfile.years")}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 bg-[#FFF5F6]/55 p-2.5 rounded-2xl border border-[#FFF5F6]">
                  <div className="bg-white p-2 rounded-xl text-[#D8125B] shadow-xs">
                    <FaTrophy size={14} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block" style={{ fontSize: '0.65rem' }}>{t("contractorProfile.completedProjects")}</span>
                    <span className="text-sm font-bold text-gray-800">
                      {profile?.completedProjects} {t("contractExperience.projects")}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 bg-[#FFF5F6]/55 p-2.5 rounded-2xl border border-[#FFF5F6]">
                  <div className="bg-white p-2 rounded-xl text-[#D8125B] shadow-xs">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase block" style={{ fontSize: '0.65rem' }}>{t("contractorProfile.currentLocation")}</span>
                    <span className="text-sm font-bold text-gray-800 truncate max-w-[170px]" title={translatedLocation}>
                      {translatedLocation || t("contractorProfile.notSpecified")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Details & Portfolios */}
          <div className="col-lg-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 border-t-8 border-t-[#D8125B] d-flex flex-col gap-4">
              
              {/* Previous Projects Section */}
              <div>
                <h3 className="fw-bold text-[#D8125B] mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <FaBriefcase />
                  {t("contractExperience.projectsTitle")}
                </h3>
                {translatedWorkDetails ? (
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed bg-[#FFF5F6] p-4 rounded-3xl border border-[#D8125B]/10 mb-0 shadow-xs">
                    {translatedWorkDetails}
                  </pre>
                ) : (
                  <div className="bg-[#FFF5F6] text-red-900 p-4 rounded-3xl border border-[#D8125B]/10 text-center">
                    <p className="text-sm mb-0 text-gray-600">
                      {t("contractExperience.noProjects")}
                    </p>
                  </div>
                )}
              </div>

              {/* Active Openings Portfolio Section */}
              <div>
                <h3 className="fw-bold text-[#D8125B] mb-3 pb-2 border-b border-gray-100 flex items-center gap-2 mt-2">
                  <FaClipboardList />
                  {t("contractExperience.activeJobsTitle")}
                </h3>
                {activeJobs.length === 0 ? (
                  <div className="bg-[#FFF5F6] text-red-900 p-4 rounded-3xl border border-[#D8125B]/10 text-center">
                    <p className="text-sm mb-0 text-gray-600">
                      {t("contractExperience.noJobs")}
                    </p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {activeJobs.map((job) => (
                      <div className="col-md-6" key={job.jobId}>
                        <div className="bg-[#FFF5F6] rounded-3xl p-4 shadow-sm border border-[#D8125B]/20 d-flex flex-col justify-between h-100">
                          <div>
                            <h5 className="fw-bold text-[#D8125B] mb-3 text-truncate" title={job.translatedTitle || job.jobTitle}>
                              💼 {job.translatedTitle || job.jobTitle}
                            </h5>

                            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs space-y-1.5">
                              <div className="d-flex justify-content-between text-xs">
                                <span className="text-gray-400 font-bold uppercase">{t("workerJobs.location")}</span>
                                <span className="font-semibold text-gray-800 truncate max-w-[120px]">{job.translatedLocation || job.location}</span>
                              </div>
                              <div className="d-flex justify-content-between text-xs">
                                <span className="text-gray-400 font-bold uppercase">{t("workerJobs.workingHours")}</span>
                                <span className="font-semibold text-gray-800">{job.workingHours} Hrs</span>
                              </div>
                              <div className="d-flex justify-content-between text-xs">
                                <span className="text-gray-400 font-bold uppercase">{t("workerJobs.salary")}</span>
                                <span className="font-semibold text-gray-800">₹{job.salary}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3.5 pt-2 border-t border-[#D8125B]/10 d-flex align-items-center justify-between">
                            <span className="text-xs text-gray-400 font-bold uppercase">Work Status</span>
                            <span className="badge bg-success text-white px-2.5 py-1 rounded-pill" style={{ fontSize: '0.7rem' }}>
                              {t("contractExperience.statusActive")}
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

        </div>

      </main>
    </div>
  );
}

export default ContractExperience;
