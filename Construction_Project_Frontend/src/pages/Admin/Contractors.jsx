import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getContractors, deleteUser } from "../../services/adminService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";

function AdminContractors() {
  const { t } = useTranslation();
  const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();
  
  const [contractors, setContractors] = useState([]);
  const [translatedContractors, setTranslatedContractors] = useState([]);

  useEffect(() => {
    loadContractors();
  }, []);

  useEffect(() => {
    if (contractors.length > 0) {
      translateAllContractors();
    } else {
      setTranslatedContractors([]);
    }
  }, [contractors, currentLang]);

  const translateAllContractors = async () => {
    if (currentLang === 'en') {
      setTranslatedContractors(contractors);
      return;
    }

    const newContractors = await Promise.all(contractors.map(async (contractor) => {
      const translatedName = contractor.contractorName ? await translate(contractor.contractorName) : null;
      const translatedLocation = (contractor.district || contractor.address) ? await translate(contractor.district || contractor.address) : null;
      
      return {
        ...contractor,
        translatedName,
        translatedLocation
      };
    }));
    setTranslatedContractors(newContractors);
  };

  const loadContractors = async () => {
    try {
      const response = await getContractors();
      setContractors(response.data);
    } catch (error) {
      console.error("Failed to load contractors", error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm(t("adminContractors.deleteConfirm"))) return;
    try {
      await deleteUser(userId);
      alert(t("adminContractors.deleteSuccess"));
      loadContractors();
    } catch (error) {
      console.error("Failed to delete contractor", error);
      alert(t("adminContractors.deleteError"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-warning fw-bold">{t("adminContractors.title")}</h2>
          <Link to="/admin/dashboard" className="btn btn-secondary fw-bold">
            {t("adminContractors.backToDashboard")}
          </Link>
        </div>

        {isTranslating ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-[#D8125B] mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">{t("adminContractors.loadingTranslations")}</h5>
          </div>
        ) : translatedContractors.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm py-4">
            <h4 className="mb-0">{t("adminContractors.noContractors")}</h4>
          </div>
        ) : (
          <div className="table-responsive shadow rounded-4">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>{t("adminContractors.contractorName")}</th>
                  <th>{t("adminContractors.completedProjects")}</th>
                  <th>{t("adminContractors.experience")}</th>
                  <th>{t("adminContractors.location")}</th>
                  <th>{t("adminContractors.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {translatedContractors.map((contractor) => (
                  <tr key={contractor.contractorId}>
                    <td className="fw-bold">{contractor.translatedName || contractor.contractorName || t("adminContractors.notAvailable")}</td>
                    <td><span className="badge bg-success">{contractor.completedProjects || 0}</span></td>
                    <td>{contractor.experienceYears || 0} {t("adminContractors.years")}</td>
                    <td>{contractor.translatedLocation || contractor.district || contractor.address || t("adminContractors.notAvailable")}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm fw-bold"
                        onClick={() => handleDelete(contractor.user.userId)}
                      >
                        {t("adminContractors.delete")}
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

export default AdminContractors;
