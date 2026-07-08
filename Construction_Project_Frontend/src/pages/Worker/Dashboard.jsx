import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBriefcase, FaFileAlt, FaTools } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function WorkerDashboard() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-6">
          <div className="bg-teal-100 p-3 rounded-xl text-[#0D9488]">
            <FaUserCircle size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t("workerDashboard.title")}
            </h2>
            <p className="text-gray-500 mt-1">{t("workerDashboard.subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {/* My Work Details Card */}
          <div className="bg-[#EAF8F7] rounded-2xl p-6 shadow-sm border border-[#0D9488]/10 border-t-4 border-t-[#0D9488] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-teal-50 text-[#0D9488] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaBriefcase size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{t("workerDashboard.workDetailsTitle")}</h4>
            <p className="text-gray-500 flex-grow mb-6 text-sm">
              {t("workerDashboard.workDetailsDesc")}
            </p>
            <Link
              to="/worker/work-details"
              className="dashboard-btn dashboard-btn-orange-hover-yellow"
            >
              {t("workerDashboard.workDetailsButton")}
            </Link>
          </div>

          {/* Jobs Card */}
          <div className="bg-[#EAF8F7] rounded-2xl p-6 shadow-sm border border-[#0D9488]/10 border-t-4 border-t-[#0D9488] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-teal-50 text-[#0D9488] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaTools size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{t("workerDashboard.jobsTitle")}</h4>
            <p className="text-gray-500 flex-grow mb-6 text-sm">
              {t("workerDashboard.jobsDesc")}
            </p>
            <Link
              to="/worker/jobs"
              className="dashboard-btn dashboard-btn-orange"
            >
              {t("workerDashboard.jobsButton")}
            </Link>
          </div>

          {/* Applications Card */}
          <div className="bg-[#EAF8F7] rounded-2xl p-6 shadow-sm border border-[#0D9488]/10 border-t-4 border-t-[#0D9488] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-teal-50 text-[#0D9488] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaFileAlt size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{t("workerDashboard.appsTitle")}</h4>
            <p className="text-gray-500 flex-grow mb-6 text-sm">
              {t("workerDashboard.appsDesc")}
            </p>
            <Link
              to="/worker/my-applications"
              className="dashboard-btn dashboard-btn-green"
            >
              {t("workerDashboard.appsButton")}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WorkerDashboard;
