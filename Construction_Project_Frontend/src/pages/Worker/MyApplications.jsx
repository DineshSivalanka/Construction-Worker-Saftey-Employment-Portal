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
          <h2 className="text-warning fw-bold">{t("workerApplications.title")}</h2>
          <Link to="/worker/jobs" className="btn btn-primary fw-bold">
            {t("workerApplications.findMoreJobs")}
          </Link>
        </div>

        {isTranslating ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-[#D8125B] mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">{t("workerApplications.loadingTranslations")}</h5>
          </div>
        ) : translatedApps.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm border-0 py-4">
            <h4 className="mb-0">{t("workerApplications.noApplications")}</h4>
          </div>
        ) : (
          <div className="row">
            {translatedApps.map((app) => (
              <div className="col-md-6 mb-4" key={app.applicationId}>
                <div className="card shadow-sm border-0 h-100 rounded-4">
                  <div className="card-header bg-dark text-gray-900 rounded-top-4 py-3">
                    <h5 className="mb-0 text-white">
                      {app.translatedTitle || (app.job ? app.job.jobTitle : t("workerApplications.unknownJob"))}
                    </h5>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>{t("workerApplications.location")}:</strong> {app.translatedLocation || (app.job ? app.job.location : t("workerApplications.notAvailable"))}
                    </p>
                    <p>
                      <strong>{t("workerApplications.salary")}:</strong> ₹{app.job ? app.job.salary : 0}
                    </p>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">{t("workerApplications.status")}:</span>
                      <span className={`badge ${getBadge(app.status)} fs-6`}>
                        {app.translatedStatus || app.status}
                      </span>
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
