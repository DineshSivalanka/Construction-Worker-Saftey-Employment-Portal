import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBriefcase, FaFileAlt } from "react-icons/fa";

function WorkerDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-6">
          <div className="bg-orange-100 p-3 rounded-xl text-[#D8125B]">
            <FaUserCircle size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Worker Dashboard
            </h2>
            <p className="text-gray-500 mt-1">Manage your profile, browse jobs, and track your applications.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-orange-50 text-[#D8125B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaUserCircle size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">My Profile</h4>
            <p className="text-gray-500 flex-grow mb-8">
              Keep your personal details, skills, and work experience up to date to attract more contractors.
            </p>
            <Link
              to="/worker/profile"
              className="w-full py-3 px-4 bg-orange-50 text-orange-700 font-semibold rounded-xl hover:bg-[#D8125B] hover:text-white transition-colors duration-300 text-center"
            >
              View Profile
            </Link>
          </div>

          {/* Jobs Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-orange-50 text-[#D8125B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaBriefcase size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Available Jobs</h4>
            <p className="text-gray-500 flex-grow mb-8">
              Browse all open jobs posted by contractors and find the perfect match for your skills.
            </p>
            <Link
              to="/worker/jobs"
              className="w-full py-3 px-4 bg-orange-50 text-orange-700 font-semibold rounded-xl hover:bg-[#D8125B] hover:text-white transition-colors duration-300 text-center"
            >
              View Jobs
            </Link>
          </div>

          {/* Applications Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaFileAlt size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">My Applications</h4>
            <p className="text-gray-500 flex-grow mb-8">
              Check the status of jobs you have applied for and track responses from contractors.
            </p>
            <Link
              to="/worker/my-applications"
              className="w-full py-3 px-4 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-colors duration-300 text-center"
            >
              View Applications
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WorkerDashboard;
