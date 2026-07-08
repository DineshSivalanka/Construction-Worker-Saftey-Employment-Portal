import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHardHat, FaBars, FaTimes, FaSignOutAlt, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { getContractorProfile } from "../services/contractorService";
import { getWorkerProfile } from "../services/workerService";

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";
    const cleaned = name.trim().replace(/[👷🏢]/g, "").trim();
    if (!cleaned) return "?";
    return cleaned
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    if (!userId || !role) return;

    const handleStorageChange = () => {
      const storedName = localStorage.getItem("userName");
      if (storedName) setUserName(storedName);
    };
    window.addEventListener("storage", handleStorageChange);

    const fetchName = async () => {
      try {
        if (role === "CONTRACTOR") {
          const res = await getContractorProfile(userId);
          if (res.data && res.data.contractorName) {
            setUserName(res.data.contractorName);
            localStorage.setItem("userName", res.data.contractorName);
          }
        } else if (role === "WORKER") {
          const res = await getWorkerProfile(userId);
          if (res.data && res.data.workerName) {
            setUserName(res.data.workerName);
            localStorage.setItem("userName", res.data.workerName);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user name in Navbar:", err);
      }
    };

    if (!userName) {
      fetchName();
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userId, role, userName]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const LanguageSelector = ({ className = "" }) => (
    <select 
      className={`bg-transparent text-white font-medium outline-none cursor-pointer ${className}`}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={i18n.language || 'en'}
    >
      <option value="en" className="text-black">English</option>
      <option value="te" className="text-black">తెలుగు</option>
      <option value="hi" className="text-black">हिंदी</option>
    </select>
  );

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
      className="flex items-center justify-center px-3 py-1.5 text-sm text-white font-medium bg-white/5 hover:bg-[#D8125B] rounded-md transition-all duration-300 border border-transparent hover:border-[#D8125B] text-center no-underline whitespace-nowrap"
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#2C2E39] shadow-md border-b border-black/20">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20 items-center">

          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" style={{ textDecoration: 'none' }} className="flex items-center gap-3 text-white text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity no-underline">
              <div className="text-[#D8125B] p-2">
                <FaHardHat size={28} />
              </div>
              <span className="block font-bold">Construction Portal</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange-100 focus:outline-none p-2"
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">

            {!userId ? (
              <>
                <NavLink to="/">{t("navbar.home")}</NavLink>
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
                  <LanguageSelector />
                  <NavLink to="/login">{t("navbar.login")}</NavLink>
                  <Link
                    to="/register"
                    style={{ textDecoration: 'none' }}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#D8125B] to-[#f43f5e] text-white font-bold rounded-full shadow-sm hover:from-[#f43f5e] hover:to-[#D8125B] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline"
                  >
                    {t("navbar.register")}
                  </Link>
                </div>
              </>
            ) : (
              <>
                {role === "WORKER" && (
                  <>
                    <NavLink to="/worker/dashboard">Dashboard</NavLink>
                    <NavLink to="/worker/jobs">Find Jobs</NavLink>
                    <NavLink to="/worker/my-applications">My Applications</NavLink>
                  </>
                )}
                {role === "CONTRACTOR" && (
                  <>
                    <NavLink to="/contractor/dashboard">Dashboard</NavLink>
                    <NavLink to="/contractor/post-job">Post Job</NavLink>
                    <NavLink to="/contractor/my-jobs">My Jobs</NavLink>
                  </>
                )}
                {role === "ADMIN" && (
                  <>
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    <NavLink to="/admin/workers">Workers</NavLink>
                    <NavLink to="/admin/contractors">Contractors</NavLink>
                    <NavLink to="/admin/jobs">Jobs</NavLink>
                  </>
                )}

                <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/20">
                  <LanguageSelector />
                  
                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-full transition-all duration-300 border border-white/20 shadow-sm hover:shadow-md focus:outline-none group"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xs border border-white/20 text-white select-none ${role === 'WORKER' ? 'bg-[#0D9488]' : 'bg-[#D8125B]'}`}>
                        {getInitials(userName || role)}
                      </div>
                      <span className="text-sm font-semibold tracking-wide truncate max-w-[120px] group-hover:text-gray-900">{userName || role}</span>
                      <FaChevronDown size={10} className={`transition-transform duration-300 opacity-80 group-hover:text-gray-900 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-60 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 z-50 transform origin-top-right transition-all duration-300" style={{ backdropFilter: 'blur(10px)' }}>
                        
                        {/* Dropdown Header Section */}
                        <div className="px-4 pb-3 pt-1 border-b border-gray-100 d-flex align-items-center gap-3 mb-2">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shadow-sm text-white select-none ${role === 'WORKER' ? 'bg-[#0D9488]' : 'bg-[#D8125B]'}`}>
                            {getInitials(userName || role)}
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-bold text-gray-800 mb-0.5 truncate leading-tight" title={userName || role}>
                              {userName || role}
                            </p>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                              {role === "WORKER" ? t("workerProfile.roleWorker", "Worker") : t("contractExperience.roleContractor", "Contractor")}
                            </span>
                          </div>
                        </div>

                        {/* Dropdown Options */}
                        <div className="px-2 flex flex-col gap-1">
                          <Link
                            to={role === "WORKER" ? "/worker/profile" : "/contractor/profile"}
                            onClick={() => setIsProfileDropdownOpen(false)}
                            style={{ textDecoration: 'none' }}
                            className={`flex items-center gap-3 px-3 py-2.5 font-bold transition-all text-left text-sm no-underline border-0 bg-transparent rounded-2xl ${role === 'WORKER' ? 'text-gray-700 hover:text-[#0D9488] hover:bg-teal-50/50' : 'text-gray-700 hover:text-[#D8125B] hover:bg-[#FFF5F6]'}`}
                          >
                            <FaUserCircle size={16} className={`opacity-70 ${role === 'WORKER' ? 'group-hover:text-[#0D9488]' : 'group-hover:text-[#D8125B]'}`} />
                            <span>{t("navbar.myProfile", "My Profile")}</span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50/70 font-bold transition-all text-left border-0 bg-transparent text-sm rounded-2xl"
                          >
                            <FaSignOutAlt size={16} className="opacity-80" />
                            <span>{t("navbar.logout")}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#2C2E39] shadow-inner pb-4 px-2 border-t border-black/20">
          <div className="px-2 pt-2 pb-3 flex flex-col gap-3">
            
            <LanguageSelector className="mb-2 px-2" />

            {!userId ? (
              <>
                <NavLink to="/">{t("navbar.home")}</NavLink>
                <NavLink to="/login">{t("navbar.login")}</NavLink>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  style={{ textDecoration: 'none' }}
                  className="mt-4 text-center block px-4 py-3 bg-gradient-to-r from-[#D8125B] to-[#f43f5e] text-white font-bold rounded-full shadow-sm hover:from-[#f43f5e] hover:to-[#D8125B] transition-all duration-300 no-underline"
                >
                  {t("navbar.register")}
                </Link>
              </>
            ) : (
              <>
                {role === "WORKER" && (
                  <>
                    <NavLink to="/worker/dashboard">{t("navbar.dashboard")}</NavLink>
                    <NavLink to="/worker/jobs">{t("navbar.findJobs")}</NavLink>
                    <NavLink to="/worker/my-applications">{t("navbar.myApplications")}</NavLink>
                  </>
                )}
                {role === "CONTRACTOR" && (
                  <>
                    <NavLink to="/contractor/dashboard">{t("navbar.dashboard")}</NavLink>
                    <NavLink to="/contractor/post-job">{t("navbar.postJob")}</NavLink>
                    <NavLink to="/contractor/my-jobs">{t("navbar.myJobs")}</NavLink>
                  </>
                )}
                {role === "ADMIN" && (
                  <>
                    <NavLink to="/admin/dashboard">{t("navbar.dashboard")}</NavLink>
                    <NavLink to="/admin/workers">{t("navbar.workers")}</NavLink>
                    <NavLink to="/admin/contractors">{t("navbar.contractors")}</NavLink>
                    <NavLink to="/admin/jobs">{t("navbar.jobs")}</NavLink>
                  </>
                )}
                <div className="pt-4 mt-2 border-t border-black/20">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white font-bold rounded-lg"
                  >
                    <FaSignOutAlt />
                    {t("navbar.logout")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
