import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getContractorProfile, updateContractorProfile } from "../../services/contractorService";
import { FaEdit, FaTimes, FaBriefcase, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaFolderOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function ContractorProfile() {
  const { t } = useTranslation();
  const contractorId = localStorage.getItem("userId");

  const [profile, setProfile] = useState({
    contractorName: "",
    address: "",
    village: "",
    district: "",
    experienceYears: 0,
    completedProjects: 0,
    previousWorkDetails: "",
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [contractorId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getContractorProfile(contractorId);
      if (response.data) {
        const data = response.data;
        const loadedProfile = {
          contractorName: data.contractorName || "",
          address: data.address || "",
          village: data.village || "",
          district: data.district || "",
          experienceYears: data.experienceYears !== undefined ? data.experienceYears : 0,
          completedProjects: data.completedProjects !== undefined ? data.completedProjects : 0,
          previousWorkDetails: data.previousWorkDetails || "",
        };
        setProfile(loadedProfile);
        setTempProfile(loadedProfile);
      }
    } catch (error) {
      console.error("Failed to fetch contractor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Cancel edit: reset temp profile to current saved profile
      setTempProfile({ ...profile });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...tempProfile,
        experienceYears: parseInt(tempProfile.experienceYears) || 0,
        completedProjects: parseInt(tempProfile.completedProjects) || 0,
      };
      
      const response = await updateContractorProfile(contractorId, payload);
      if (response.status === 200 || response.status === 204 || response.data) {
        setProfile(payload);
        setIsEditing(false);
        localStorage.setItem("userName", payload.contractorName);
        window.dispatchEvent(new Event("storage"));
        alert(t("contractorProfile.updateSuccess", "Profile updated successfully!"));
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      if (error.response?.data?.errors) {
        alert(t("contractorProfile.validationError", "Validation failed: ") + JSON.stringify(error.response.data.errors));
      } else {
        alert(t("contractorProfile.updateFailed", "Failed to update profile: ") + (error.response?.data || error.message));
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-[#D8125B]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 border-t-8 border-t-[#D8125B] relative transition-all duration-300">
          
          {/* Header Action Button (Top-Right) */}
          <div className="absolute top-5 right-5">
            <button
              onClick={handleEditClick}
              className={`btn btn-sm d-flex align-items-center gap-2 rounded-xl px-3 py-1.5 font-bold transition-all shadow-sm ${
                isEditing
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                  : "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-[#D8125B] hover:text-white"
              }`}
              style={{ height: '34px' }}
            >
              {isEditing ? (
                <>
                  <FaTimes size={12} /> {t("contractorProfile.cancel", "Cancel")}
                </>
              ) : (
                <>
                  <FaEdit size={12} /> {t("contractorProfile.edit", "Edit Profile")}
                </>
              )}
            </button>
          </div>

          {/* Profile Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 mb-5 pb-3.5 border-b border-gray-100">
            <div className="bg-orange-100 p-3 rounded-2xl text-[#D8125B] flex-shrink-0">
              <FaBuilding size={28} />
            </div>
            <div style={{ maxWidth: '80%' }}>
              <h2 className="text-2xl font-extrabold text-gray-900 truncate">
                {profile.contractorName || t("contractorProfile.noName", "Unnamed Contractor")}
              </h2>
              <p className="text-gray-500 font-semibold mt-0.5 text-sm">👷 {t("contractorProfile.roleContractor", "Registered Contractor")}</p>
            </div>
          </div>

          {!isEditing ? (
            /* VIEW MODE */
            <div className="space-y-5 animate-fade-in">
              {/* Stats Block (Experience and Projects) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FDF2F5] rounded-2xl p-4 border border-[#D8125B]/10 d-flex align-items-center gap-3.5">
                  <div className="bg-white p-3 rounded-xl text-[#D8125B] shadow-xs">
                    <FaCalendarAlt size={20} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 small fw-bold mb-0 uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>{t("contractorProfile.experience", "Years of Experience")}</h5>
                    <p className="text-xl font-bold text-gray-800 mb-0">{profile.experienceYears} {t("contractorProfile.years", "Years")}</p>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 d-flex align-items-center gap-3.5">
                  <div className="bg-white p-3 rounded-xl text-emerald-600 shadow-xs">
                    <FaFolderOpen size={20} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 small fw-bold mb-0 uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>{t("contractorProfile.projects", "Completed Projects")}</h5>
                    <p className="text-xl font-bold text-gray-800 mb-0">{profile.completedProjects} {t("contractorProfile.projectCount", "Projects")}</p>
                  </div>
                </div>
              </div>

              {/* Location Block */}
              <div className="bg-white rounded-2xl p-4.5 border border-gray-100 shadow-xs" style={{ padding: '18px' }}>
                <h4 className="text-lg font-bold text-gray-900 mb-2.5 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-500" size={15} />
                  {t("contractorProfile.locationInfo", "Location Details")}
                </h4>
                
                <div className="row g-2">
                  <div className="col-md-6">
                    <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.68rem' }}>{t("contractorProfile.villageLabel", "Village")}</span>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 mb-1.5">{profile.village || t("contractorProfile.notSpecified", "Not Specified")}</p>
                  </div>
                  <div className="col-md-6">
                    <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.68rem' }}>{t("contractorProfile.districtLabel", "District")}</span>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 mb-1.5">{profile.district || t("contractorProfile.notSpecified", "Not Specified")}</p>
                  </div>
                  <div className="col-12 mt-0.5">
                    <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.68rem' }}>{t("contractorProfile.addressLabel", "Full Address")}</span>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 mb-0 bg-gray-50 p-2.5 rounded-xl border border-gray-100">{profile.address || t("contractorProfile.notSpecified", "Not Specified")}</p>
                  </div>
                </div>
              </div>

              {/* Previous Work Block */}
              <div className="bg-white rounded-2xl p-4.5 border border-gray-100 shadow-xs" style={{ padding: '18px' }}>
                <h4 className="text-lg font-bold text-gray-900 mb-2.5 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <FaBriefcase className="text-purple-500" size={15} />
                  {t("contractorProfile.workDetails", "Previous Work & Project Details")}
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 whitespace-pre-line mb-0">
                  {profile.previousWorkDetails || t("contractorProfile.noWorkDetails", "No previous work details provided yet.")}
                </p>
              </div>
            </div>
          ) : (
            /* EDIT MODE */
            <form onSubmit={handleSave} className="space-y-4 animate-fade-in">
              <div className="row g-3">
                {/* Contractor Name */}
                <div className="col-12">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("contractorProfile.nameLabel", "Contractor/Company Name")}</label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#D8125B] focus:ring-1 focus:ring-[#D8125B]"
                    style={{ fontSize: '0.9rem' }}
                    name="contractorName"
                    value={tempProfile.contractorName}
                    onChange={handleChange}
                  />
                </div>

                {/* Experience & Projects */}
                <div className="col-md-6">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("contractorProfile.experienceLabel", "Experience (Years)")}</label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#D8125B] focus:ring-1 focus:ring-[#D8125B]"
                    style={{ fontSize: '0.9rem' }}
                    name="experienceYears"
                    value={tempProfile.experienceYears}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("contractorProfile.projectsLabel", "Completed Projects")}</label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#D8125B] focus:ring-1 focus:ring-[#D8125B]"
                    style={{ fontSize: '0.9rem' }}
                    name="completedProjects"
                    value={tempProfile.completedProjects}
                    onChange={handleChange}
                  />
                </div>

                {/* Village & District */}
                <div className="col-md-6">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("contractorProfile.villageInput", "Village")}</label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#D8125B] focus:ring-1 focus:ring-[#D8125B]"
                    style={{ fontSize: '0.9rem' }}
                    name="village"
                    value={tempProfile.village}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("contractorProfile.districtInput", "District")}</label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#D8125B] focus:ring-1 focus:ring-[#D8125B]"
                    style={{ fontSize: '0.9rem' }}
                    name="district"
                    value={tempProfile.district}
                    onChange={handleChange}
                  />
                </div>

                {/* Full Address */}
                <div className="col-12">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("contractorProfile.addressInput", "Full Address")}</label>
                  <textarea
                    required
                    rows="3"
                    className="form-control rounded-xl p-3 border-gray-300 focus:border-[#D8125B] focus:ring-1 focus:ring-[#D8125B]"
                    style={{ fontSize: '0.9rem' }}
                    name="address"
                    value={tempProfile.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Previous Work Details */}
                <div className="col-12">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("contractorProfile.workDetailsInput", "Previous Work & Project Details")}</label>
                  <textarea
                    required
                    rows="4"
                    className="form-control rounded-xl p-3 border-gray-300 focus:border-[#D8125B] focus:ring-1 focus:ring-[#D8125B]"
                    style={{ fontSize: '0.9rem' }}
                    name="previousWorkDetails"
                    value={tempProfile.previousWorkDetails}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="btn px-4 py-2 font-bold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  style={{ fontSize: '0.85rem' }}
                >
                  {t("contractorProfile.cancel", "Cancel")}
                </button>
                <button
                  type="submit"
                  className="btn px-5 py-2 font-bold rounded-xl text-white hover:opacity-95 transition-all shadow-md d-flex align-items-center gap-2"
                  style={{ backgroundColor: '#D8125B', fontSize: '0.85rem' }}
                >
                  <FaCheck size={11} />
                  {t("contractorProfile.saveProfile", "Save Profile")}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ContractorProfile;
