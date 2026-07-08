import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHardHat, FaBars, FaTimes, FaSignOutAlt, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
                    className="px-6 py-2.5 bg-[#D8125B] text-white font-bold rounded-lg shadow-sm hover:bg-[#D8125B]/80 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 no-underline"
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
                    <NavLink to="/worker/profile">My Profile</NavLink>
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
                      className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10 focus:outline-none"
                    >
                      <FaUserCircle size={20} />
                      <span className="text-sm font-medium tracking-wide">{role}</span>
                      <FaChevronDown size={12} className={`transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100 py-2">
                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                          <p className="text-xs text-gray-500 font-semibold uppercase">{t("navbar.loggedInAs", "Logged in as")}</p>
                          <p className="text-sm font-bold text-gray-800 truncate">{role}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 font-semibold transition-colors text-left"
                        >
                          <FaSignOutAlt />
                          <span>{t("navbar.logout")}</span>
                        </button>
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
                  className="mt-4 text-center block px-4 py-3 bg-[#D8125B] text-white font-bold rounded-lg shadow-sm hover:bg-[#D8125B]/80 transition-colors no-underline"
                >
                  {t("navbar.register")}
                </Link>
              </>
            ) : (
              <>
                {role === "WORKER" && (
                  <>
                    <NavLink to="/worker/dashboard">{t("navbar.dashboard")}</NavLink>
                    <NavLink to="/worker/profile">{t("navbar.myProfile")}</NavLink>
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
