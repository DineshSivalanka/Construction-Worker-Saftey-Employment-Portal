import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHardHat, FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <Link 
                  style={{ textDecoration: 'none' }}
                  className="ml-4 px-6 py-2.5 bg-[#D8125B] text-white font-bold rounded-lg shadow-sm hover:bg-[#D8125B]/80 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 no-underline"
                >
                  Register
                </Link>
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
                  <div className="flex items-center text-white/90 gap-2">
                    <FaUserCircle size={20} />
                    <span className="text-sm font-medium tracking-wide">{role}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/90 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#2C2E39] shadow-inner pb-4 px-2 border-t border-black/20">
          <div className="px-2 pt-2 pb-3 flex flex-col gap-3">
            {!userId ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <Link 
                  to="/register" 
                  onClick={() => setIsOpen(false)}
                  style={{ textDecoration: 'none' }}
                  className="mt-4 text-center block px-4 py-3 bg-[#D8125B] text-white font-bold rounded-lg shadow-sm hover:bg-[#D8125B]/80 transition-colors no-underline"
                >
                  Register
                </Link>
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
                <div className="pt-4 mt-2 border-t border-black/20">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white font-bold rounded-lg"
                  >
                    <FaSignOutAlt />
                    Logout
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
