import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { FaBuilding, FaPlusCircle, FaClipboardList, FaUsers } from "react-icons/fa";

function ContractorDashboard() {
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
              Contractor Dashboard
            </h2>
            <p className="text-gray-500 mt-1">Manage your job postings, review applicants, and grow your workforce.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          
          {/* Post Job Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-amber-50 text-[#2C2E39] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaPlusCircle size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Post New Job</h4>
            <p className="text-gray-500 flex-grow mb-8">
              Create a new job posting specifying required skills, location, and workers needed.
            </p>
            <Link
              to="/contractor/post-job"
              className="w-full py-3 px-4 bg-amber-50 text-amber-700 font-semibold rounded-xl hover:bg-amber-500 hover:text-white transition-colors duration-300 text-center"
            >
              Post Job
            </Link>
          </div>

          {/* My Jobs Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-orange-50 text-[#D8125B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaClipboardList size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">My Jobs</h4>
            <p className="text-gray-500 flex-grow mb-8">
              View, edit, or delete the construction jobs you have currently posted on the platform.
            </p>
            <Link
              to="/contractor/my-jobs"
              className="w-full py-3 px-4 bg-orange-50 text-orange-700 font-semibold rounded-xl hover:bg-[#D8125B] hover:text-white transition-colors duration-300 text-center"
            >
              Manage Jobs
            </Link>
          </div>

          {/* Applicants Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 border-t-4 border-t-[#D8125B] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaUsers size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Applicants</h4>
            <p className="text-gray-500 flex-grow mb-8">
              Review incoming applications, check worker profiles, and accept or reject candidates.
            </p>
            <Link
              to="/contractor/my-jobs"
              className="w-full py-3 px-4 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-colors duration-300 text-center"
            >
              View Applicants
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContractorDashboard;
