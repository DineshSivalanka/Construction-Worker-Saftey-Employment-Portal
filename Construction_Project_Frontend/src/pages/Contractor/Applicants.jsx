import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  getApplicants,
  acceptApplicant,
  rejectApplicant,
} from "../../services/contractorService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";

const Applicants = () => {
  const { t } = useTranslation();
  const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();
  
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
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
                    </p>

                    <hr />

                    {app.status === "PENDING" ? (
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-success fw-bold w-45"
                          onClick={() => handleAccept(app.applicationId)}
                        >
                          {t("contractorApplicants.accept")}
                        </button>

                        <button
                          className="btn btn-danger fw-bold w-45"
                          onClick={() => handleReject(app.applicationId)}
                        >
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
