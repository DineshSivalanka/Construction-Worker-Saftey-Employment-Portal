import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getWorkers, deleteUser } from "../../services/adminService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";

function AdminWorkers() {
  const { t } = useTranslation();
  const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();
  
  const [workers, setWorkers] = useState([]);
  const [translatedWorkers, setTranslatedWorkers] = useState([]);

  useEffect(() => {
    loadWorkers();
  }, []);

  useEffect(() => {
    if (workers.length > 0) {
      translateAllWorkers();
    } else {
      setTranslatedWorkers([]);
    }
  }, [workers, currentLang]);

  const translateAllWorkers = async () => {
    if (currentLang === 'en') {
      setTranslatedWorkers(workers);
      return;
    }

    const newWorkers = await Promise.all(workers.map(async (worker) => {
      const translatedName = worker.workerName ? await translate(worker.workerName) : null;
      const translatedSkill = worker.skill ? await translate(worker.skill) : null;
      const translatedLocation = (worker.currentLocation || worker.address) ? await translate(worker.currentLocation || worker.address) : null;
      
      return {
        ...worker,
        translatedName,
        translatedSkill,
        translatedLocation
      };
    }));
    setTranslatedWorkers(newWorkers);
  };

  const loadWorkers = async () => {
    try {
      const response = await getWorkers();
      setWorkers(response.data);
    } catch (error) {
      console.error("Failed to load workers", error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm(t("adminWorkers.deleteConfirm"))) return;
    try {
      await deleteUser(userId);
      alert(t("adminWorkers.deleteSuccess"));
      loadWorkers();
    } catch (error) {
      console.error("Failed to delete worker", error);
      alert(t("adminWorkers.deleteError"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-[#D8125B] fw-bold">{t("adminWorkers.title")}</h2>
          <Link to="/admin/dashboard" className="btn btn-secondary fw-bold">
            {t("adminWorkers.backToDashboard")}
          </Link>
        </div>

        {isTranslating ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-[#D8125B] mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">{t("adminWorkers.loadingTranslations")}</h5>
          </div>
        ) : translatedWorkers.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm py-4">
            <h4 className="mb-0">{t("adminWorkers.noWorkers")}</h4>
          </div>
        ) : (
          <div className="table-responsive shadow rounded-4">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>{t("adminWorkers.workerName")}</th>
                  <th>{t("adminWorkers.skill")}</th>
                  <th>{t("adminWorkers.experience")}</th>
                  <th>{t("adminWorkers.location")}</th>
                  <th>{t("adminWorkers.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {translatedWorkers.map((worker) => (
                  <tr key={worker.workerId}>
                    <td className="fw-bold">{worker.translatedName || worker.workerName || t("adminWorkers.notAvailable")}</td>
                    <td><span className="badge bg-warning text-dark">{worker.translatedSkill || worker.skill || t("adminWorkers.notAvailable")}</span></td>
                    <td>{worker.experienceYears || 0} {t("adminWorkers.years")}</td>
                    <td>{worker.translatedLocation || worker.currentLocation || worker.address || t("adminWorkers.notAvailable")}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm fw-bold"
                        onClick={() => handleDelete(worker.user.userId)}
                      >
                        {t("adminWorkers.delete")}
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

export default AdminWorkers;
