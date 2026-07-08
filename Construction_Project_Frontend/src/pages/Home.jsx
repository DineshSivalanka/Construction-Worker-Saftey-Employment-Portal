import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { FaHardHat, FaBuilding, FaUserShield, FaMapMarkerAlt, FaMobileAlt, FaStar, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (userId && role) {
      if (role === "WORKER") navigate("/worker/dashboard");
      else if (role === "CONTRACTOR") navigate("/contractor/dashboard");
      else if (role === "ADMIN") navigate("/admin/dashboard");
    }
  }, [navigate]);
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D8125B] to-[#2C2E39] text-white min-h-[85vh] flex items-center">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            <div className="lg:w-1/2 space-y-8">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-700/50 text-orange-100 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm border border-orange-400/30">
                {t("home.welcome")}
              </span>
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                {t("home.findSkilled")} <span className="text-yellow-200">{t("home.easily")}</span>
              </h1>
              <p className="text-lg lg:text-xl text-orange-50 font-medium max-w-xl">
                {t("home.heroDescription")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/register"
                  style={{ textDecoration: 'none' }}
                  className="px-8 py-4 bg-white text-[#D8125B] rounded-xl font-bold text-lg shadow-lg shadow-orange-900/20 hover:bg-orange-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center outline-none focus:outline-none no-underline"
                >
                  {t("home.getStarted")}
                </Link>
                <Link
                  to="/login"
                  style={{ textDecoration: 'none' }}
                  className="px-8 py-4 bg-transparent border-2 border-white/80 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 text-center outline-none focus:outline-none no-underline"
                >
                  {t("home.loginToAccount")}
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 w-full mt-12 lg:mt-0 relative group">
              <div className="absolute inset-0 bg-orange-400 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                className="relative z-10 w-full object-cover rounded-2xl shadow-2xl border border-white/20 transform group-hover:-translate-y-2 transition-transform duration-500"
                alt="Construction Site"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <FaCheckCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-0">{t("home.verified")}</p>
                  <p className="text-lg text-gray-800 font-bold mb-0">{t("home.workersCount")}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{t("home.aboutTitle")}</h2>
          <p className="text-lg text-gray-500">
            {t("home.aboutDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Worker Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-orange-50 text-[#D8125B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaHardHat size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t("home.forWorkers")}</h3>
            <p className="text-gray-500 leading-relaxed">
              {t("home.forWorkersDesc")}
            </p>
          </div>

          {/* Contractor Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-orange-50 text-[#D8125B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaBuilding size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t("home.forContractors")}</h3>
            <p className="text-gray-500 leading-relaxed">
              {t("home.forContractorsDesc")}
            </p>
          </div>

          {/* Admin Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaUserShield size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t("home.forAdmins")}</h3>
            <p className="text-gray-500 leading-relaxed">
              {t("home.forAdminsDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">{t("home.coreFeatures")}</h2>
            <div className="w-24 h-1 bg-[#D8125B] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-[#D8125B] mb-6 shadow-lg shadow-orange-500/10">
                <FaMapMarkerAlt size={36} />
              </div>
              <h5 className="text-xl font-bold mb-2">{t("home.locationBased")}</h5>
              <p className="text-gray-400 text-sm">{t("home.locationBasedDesc")}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-[#D8125B] mb-6 shadow-lg shadow-orange-500/10">
                <FaMobileAlt size={36} />
              </div>
              <h5 className="text-xl font-bold mb-2">{t("home.otpLogin")}</h5>
              <p className="text-gray-400 text-sm">{t("home.otpLoginDesc")}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-yellow-500 mb-6 shadow-lg shadow-yellow-500/10">
                <FaStar size={36} />
              </div>
              <h5 className="text-xl font-bold mb-2">{t("home.ratings")}</h5>
              <p className="text-gray-400 text-sm">{t("home.ratingsDesc")}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-green-500 mb-6 shadow-lg shadow-green-500/10">
                <FaCheckCircle size={36} />
              </div>
              <h5 className="text-xl font-bold mb-2">{t("home.easyApply")}</h5>
              <p className="text-gray-400 text-sm">{t("home.easyApplyDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
