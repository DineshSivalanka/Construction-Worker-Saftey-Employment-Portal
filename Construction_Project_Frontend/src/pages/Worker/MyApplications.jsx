import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getMyApplications } from "../../services/workerService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";

const MyApplications = () => {
  const { t } = useTranslation();
  const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();
  
  const workerId = localStorage.getItem("userId");
  const [applications, setApplications] = useState([]);
  const [translatedApps, setTranslatedApps] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    if (applications.length > 0) {
      translateAllApps();
    } else {
      setTranslatedApps([]);
    }
  }, [applications, currentLang]);

  const translateAllApps = async () => {
    if (currentLang === 'en') {
      setTranslatedApps(applications);
      return;
    }

    const newApps = await Promise.all(applications.map(async (app) => {
      const jobTitle = app.job ? app.job.jobTitle : "Unknown Job";
      const jobLocation = app.job ? app.job.location : "N/A";
      
      const translatedTitle = await translate(jobTitle);
      const translatedLocation = await translate(jobLocation);
      const translatedStatus = await translate(app.status);
      
      return {
        ...app,
        translatedTitle,
        translatedLocation,
        translatedStatus
      };
    }));
    setTranslatedApps(newApps);
  };

  const loadApplications = async () => {
    try {
      const response = await getMyApplications(workerId);
      setApplications(response.data);
    } catch (error) {
      console.error(error);
      alert(t("workerApplications.failedToLoad"));
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-success";
      case "REJECTED":
        return "bg-danger";
      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-[#0D9488] fw-bold">{t("workerApplications.title")}</h2>
          <Link 
            to="/worker/jobs" 
            className="btn btn-sm d-flex align-items-center gap-1.5 rounded-xl px-4 py-2.5 font-semibold text-sm transition-all text-white border-0 hover:bg-[#0f766e]"
            style={{ height: '42px', backgroundColor: '#0D9488', textDecoration: 'none' }}
          >
            {t("workerApplications.findMoreJobs")}
          </Link>
        </div>

        {isTranslating ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-[#0D9488] mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">{t("workerApplications.loadingTranslations")}</h5>
          </div>
        ) : translatedApps.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm border-0 py-4">
            <h4 className="mb-0">{t("workerApplications.noApplications")}</h4>
          </div>
        ) : (
          <div className="row justify-content-start">
            {translatedApps.map((app) => (
              <div className="col-md-6 col-lg-4 mb-4" key={app.applicationId}>
                <div className="bg-[#EAF8F7] rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#0D9488]/20 d-flex flex-col justify-between h-100 position-relative" style={{ borderTop: '6px solid #0D9488', maxWidth: '430px' }}>
                  <div>
                    {/* Header: Title and Status */}
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <h4 className="fw-bold text-[#0D9488] mb-0 text-truncate" title={app.translatedTitle || (app.job ? app.job.jobTitle : t("workerApplications.unknownJob"))} style={{ fontSize: '1.1rem' }}>
                          💼 {app.translatedTitle || (app.job ? app.job.jobTitle : t("workerApplications.unknownJob"))}
                        </h4>
                      </div>
                      <span className={`badge text-white px-3 py-1.5 rounded-pill shadow-sm shrink-0 ${
                        app.status === "ACCEPTED" 
                          ? "bg-[#198754]" 
                          : app.status === "REJECTED" 
                          ? "bg-[#dc3545]" 
                          : "bg-secondary"
                      }`} style={{ fontSize: '0.8rem' }}>
                        {app.translatedStatus || app.status}
                      </span>
                    </div>

                    {/* Job Details Section */}
                    <div className="mb-2 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="row g-2">
                        <div className="col-6">
                          <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.65rem' }}>{t("workerApplications.location")}</span>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5 text-truncate" title={app.translatedLocation || (app.job ? app.job.location : t("workerApplications.notAvailable"))}>
                            📍 {app.translatedLocation || (app.job ? app.job.location : t("workerApplications.notAvailable"))}
                          </p>
                        </div>
                        <div className="col-6">
                          <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.65rem' }}>{t("workerApplications.salary")}</span>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5">
                            💰 ₹{app.job ? app.job.salary : 0}
                          </p>
                        </div>
                      </div>
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
};

export default MyApplications;
