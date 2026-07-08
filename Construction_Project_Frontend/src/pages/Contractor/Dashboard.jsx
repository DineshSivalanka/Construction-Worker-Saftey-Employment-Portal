import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { FaBuilding, FaPlusCircle, FaClipboardList, FaUsers } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function ContractorDashboard() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-6">
          <div className="bg-orange-100 p-3 rounded-xl text-[#D8125B]">
            <FaBuilding size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t("contractorDashboard.title")}
            </h2>
            <p className="text-gray-500 mt-1">{t("contractorDashboard.subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          
          {/* Post Job Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-amber-50 text-[#2C2E39] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaPlusCircle size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{t("contractorDashboard.postJobTitle")}</h4>
            <p className="text-gray-500 flex-grow mb-8">
              {t("contractorDashboard.postJobDesc")}
            </p>
            <Link
              to="/contractor/post-job"
              className="w-full py-3 px-4 bg-amber-50 text-amber-700 font-semibold rounded-xl hover:bg-amber-500 hover:text-white transition-colors duration-300 text-center"
            >
              {t("contractorDashboard.postJobButton")}
            </Link>
          </div>

          {/* My Jobs Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-orange-50 text-[#D8125B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaClipboardList size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{t("contractorDashboard.myJobsTitle")}</h4>
            <p className="text-gray-500 flex-grow mb-8">
              {t("contractorDashboard.myJobsDesc")}
            </p>
            <Link
              to="/contractor/my-jobs"
              className="w-full py-3 px-4 bg-orange-50 text-orange-700 font-semibold rounded-xl hover:bg-[#D8125B] hover:text-white transition-colors duration-300 text-center"
            >
              {t("contractorDashboard.myJobsButton")}
            </Link>
          </div>

          {/* Applicants Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaUsers size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{t("contractorDashboard.appsTitle")}</h4>
            <p className="text-gray-500 flex-grow mb-8">
              {t("contractorDashboard.appsDesc")}
            </p>
            <Link
              to="/contractor/my-jobs"
              className="w-full py-3 px-4 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-colors duration-300 text-center"
            >
              {t("contractorDashboard.appsButton")}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContractorDashboard;
