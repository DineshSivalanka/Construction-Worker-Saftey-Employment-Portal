import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getWorkerProfile,
  updateWorkerProfile,
} from "../../services/workerService";
import { useTranslation } from "react-i18next";
import {
  FaUser,
  FaEdit,
  FaTimes,
  FaSave,
  FaCalendarAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaUserCircle,
  FaTools
} from "react-icons/fa";

function Profile() {
  const { t } = useTranslation();
  const workerId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getWorkerProfile(workerId);
        const data = {
          ...response.data,
          workerName: response.data?.workerName || "",
          age: response.data?.age || 18,
          gender: response.data?.gender || "Male",
          address: response.data?.address || "",
          village: response.data?.village || "",
          district: response.data?.district || "",
          skill: response.data?.skill || "Mason",
          experienceYears: response.data?.experienceYears || 0,
          currentLocation: response.data?.currentLocation || "",
        };
        setProfile(data);
        setTempProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (workerId) {
      fetchProfile();
    }
  }, [workerId]);

  const handleEditClick = () => {
    if (isEditing) {
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

  const saveProfile = async (e) => {
    e.preventDefault();

    const payload = {
      ...tempProfile,
      age: parseInt(tempProfile.age) || 18,
      experienceYears: parseInt(tempProfile.experienceYears) || 0,
    };

    try {
      const response = await updateWorkerProfile(workerId, payload);
      setProfile(payload);
      setIsEditing(false);
      localStorage.setItem("userName", payload.workerName);
      window.dispatchEvent(new Event("storage"));
      alert(t("workerProfile.updateSuccess", "Profile Updated Successfully"));
    } catch (error) {
      console.error("Failed to update profile:", error);
      if (error.response?.data?.errors) {
        alert(t("workerProfile.validationError", "Validation failed: ") + JSON.stringify(error.response.data.errors));
      } else {
        alert(t("workerProfile.updateFailed", "Failed to update profile: ") + (error.response?.data || error.message));
      }
    }
  };

  const getSkillTranslationKey = (skill) => {
    if (!skill) return "";
    const formatted = skill.replace(/\s+/g, '');
    return formatted.charAt(0).toLowerCase() + formatted.slice(1);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-[#0D9488]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200 border-t-8 border-t-[#0D9488] relative transition-all duration-300">
          
          {/* Header Action Button (Top-Right) */}
          <div className="absolute top-5 right-5">
            <button
              onClick={handleEditClick}
              className={`btn btn-sm d-flex align-items-center gap-2 rounded-xl px-3 py-1.5 font-bold transition-all shadow-sm ${
                isEditing
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                  : "bg-teal-50 text-teal-700 border border-teal-200 hover:bg-[#0D9488] hover:text-white"
              }`}
              style={{ height: '34px' }}
            >
              {isEditing ? (
                <>
                  <FaTimes size={12} /> {t("workerProfile.cancel", "Cancel")}
                </>
              ) : (
                <>
                  <FaEdit size={12} /> {t("workerProfile.edit", "Edit Profile")}
                </>
              )}
            </button>
          </div>

          {/* Profile Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
            <div className="bg-teal-100 p-3.5 rounded-2xl text-[#0D9488] flex-shrink-0">
              <FaUserCircle size={32} />
            </div>
            <div style={{ maxWidth: '80%' }}>
              <h2 className="text-2xl font-extrabold text-gray-900 truncate">
                {profile.workerName || t("workerProfile.noName", "Unnamed Worker")}
              </h2>
              <p className="text-gray-500 font-semibold mt-0.5 text-sm">👷 {t("workerProfile.roleWorker", "Registered Worker")}</p>
            </div>
          </div>

          {!isEditing ? (
            /* VIEW MODE */
            <div className="space-y-6 animate-fade-in">
              {/* Stats Block (Skill, Experience, Age, Gender) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Skill */}
                <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 d-flex align-items-center gap-3">
                  <div className="bg-white p-2.5 rounded-xl text-[#0D9488] shadow-xs">
                    <FaTools size={18} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 small fw-bold mb-0 uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>{t("workerProfile.skillLabel", "Skill")}</h5>
                    <p className="text-sm font-bold text-gray-800 mb-0">
                      {t(`workerProfile.${getSkillTranslationKey(profile.skill)}`, profile.skill)}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 d-flex align-items-center gap-3">
                  <div className="bg-white p-2.5 rounded-xl text-[#0D9488] shadow-xs">
                    <FaBriefcase size={18} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 small fw-bold mb-0 uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>{t("workerProfile.experience", "Experience")}</h5>
                    <p className="text-sm font-bold text-gray-800 mb-0">{profile.experienceYears} {t("workerProfile.years", "Years")}</p>
                  </div>
                </div>

                {/* Age */}
                <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 d-flex align-items-center gap-3">
                  <div className="bg-white p-2.5 rounded-xl text-[#0D9488] shadow-xs">
                    <FaCalendarAlt size={18} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 small fw-bold mb-0 uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>{t("workerProfile.age", "Age")}</h5>
                    <p className="text-sm font-bold text-gray-800 mb-0">{profile.age} {t("workerProfile.yearsOld", "Years Old")}</p>
                  </div>
                </div>

                {/* Gender */}
                <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 d-flex align-items-center gap-3">
                  <div className="bg-white p-2.5 rounded-xl text-[#0D9488] shadow-xs">
                    <FaUser size={18} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 small fw-bold mb-0 uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>{t("workerProfile.gender", "Gender")}</h5>
                    <p className="text-sm font-bold text-gray-800 mb-0">
                      {profile.gender === "Male" ? t("workerProfile.male", "Male") : t("workerProfile.female", "Female")}
                    </p>
                  </div>
                </div>

              </div>

              {/* Location Block */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
                <h4 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-500" size={16} />
                  {t("workerProfile.locationInfo", "Location Details")}
                </h4>
                
                <div className="row g-2">
                  <div className="col-md-4">
                    <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.7rem' }}>{t("workerProfile.currentLocation", "Current Location")}</span>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{profile.currentLocation || t("workerProfile.notSpecified", "Not Specified")}</p>
                  </div>
                  <div className="col-md-4">
                    <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.7rem' }}>{t("workerProfile.village", "Village")}</span>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{profile.village || t("workerProfile.notSpecified", "Not Specified")}</p>
                  </div>
                  <div className="col-md-4">
                    <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.7rem' }}>{t("workerProfile.district", "District")}</span>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{profile.district || t("workerProfile.notSpecified", "Not Specified")}</p>
                  </div>
                  <div className="col-12 mt-1">
                    <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.7rem' }}>{t("workerProfile.address", "Full Address")}</span>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      {profile.address || t("workerProfile.notSpecified", "Not Specified")}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* EDIT MODE */
            <form onSubmit={saveProfile} className="space-y-4 animate-fade-in">
              <div className="row g-3">
                
                {/* Worker Name */}
                <div className="col-md-6">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.nameLabel", "Name")}</label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="workerName"
                    value={tempProfile.workerName}
                    onChange={handleChange}
                  />
                </div>

                {/* Age */}
                <div className="col-md-3">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.ageLabel", "Age")}</label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="age"
                    value={tempProfile.age}
                    onChange={handleChange}
                  />
                </div>

                {/* Gender */}
                <div className="col-md-3">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.genderLabel", "Gender")}</label>
                  <select
                    className="form-select rounded-xl p-2.5 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="gender"
                    value={tempProfile.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">{t("workerProfile.male", "Male")}</option>
                    <option value="Female">{t("workerProfile.female", "Female")}</option>
                  </select>
                </div>

                {/* Skill */}
                <div className="col-md-6">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.skillLabel", "Skill")}</label>
                  <select
                    className="form-select rounded-xl p-2.5 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="skill"
                    value={tempProfile.skill}
                    onChange={handleChange}
                  >
                    <option value="Mason">{t("workerProfile.mason")}</option>
                    <option value="Carpenter">{t("workerProfile.carpenter")}</option>
                    <option value="Electrician">{t("workerProfile.electrician")}</option>
                    <option value="Painter">{t("workerProfile.painter")}</option>
                    <option value="Plumber">{t("workerProfile.plumber")}</option>
                    <option value="Steel Fixer">{t("workerProfile.steelFixer")}</option>
                    <option value="Tiles Worker">{t("workerProfile.tilesWorker")}</option>
                  </select>
                </div>

                {/* Experience Years */}
                <div className="col-md-6">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.experienceLabel", "Experience (Years)")}</label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="experienceYears"
                    value={tempProfile.experienceYears}
                    onChange={handleChange}
                  />
                </div>

                {/* Current Location */}
                <div className="col-md-4">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.currentLocationLabel", "Current Location")}</label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="currentLocation"
                    value={tempProfile.currentLocation}
                    onChange={handleChange}
                  />
                </div>

                {/* Village */}
                <div className="col-md-4">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.villageLabel", "Village")}</label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="village"
                    value={tempProfile.village}
                    onChange={handleChange}
                  />
                </div>

                {/* District */}
                <div className="col-md-4">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.districtLabel", "District")}</label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-xl p-2.5 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="district"
                    value={tempProfile.district}
                    onChange={handleChange}
                  />
                </div>

                {/* Address */}
                <div className="col-12">
                  <label className="form-label font-bold text-gray-700 mb-1" style={{ fontSize: '0.85rem' }}>{t("workerProfile.addressLabel", "Full Address")}</label>
                  <textarea
                    required
                    rows="3"
                    className="form-control rounded-xl p-3 border-gray-300 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    style={{ fontSize: '0.9rem' }}
                    name="address"
                    value={tempProfile.address}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="btn btn-sm btn-light rounded-xl px-4 py-2 font-bold text-xs"
                  style={{ height: '38px' }}
                >
                  {t("workerProfile.cancel", "Cancel")}
                </button>
                <button
                  type="submit"
                  className="btn btn-sm text-white d-flex align-items-center gap-1.5 rounded-xl px-4 py-2 font-bold text-xs border-0 hover:bg-[#0f766e]"
                  style={{ backgroundColor: '#0D9488', height: '38px' }}
                >
                  <FaSave size={12} /> {t("workerProfile.saveButton", "Save Profile")}
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}

export default Profile;
