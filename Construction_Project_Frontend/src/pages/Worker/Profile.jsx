import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getWorkerProfile,
  updateWorkerProfile,
} from "../../services/workerService";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();

  // Dynamically load user ID from storage
  const workerId = localStorage.getItem("userId");

  const [worker, setWorker] = useState({
    workerName: "",
    age: 18,
    gender: "Male",
    address: "",
    village: "",
    district: "",
    skill: "Mason",
    experienceYears: 0,
    currentLocation: "",
  });

  useEffect(() => {
    // Fetch existing profile data
    const fetchProfile = async () => {
      try {
        const response = await getWorkerProfile(workerId);
        // Only override if the backend actually returned valid data for that field
        setWorker(prev => ({
            ...prev,
            ...response.data,
            age: response.data.age || 18,
            experienceYears: response.data.experienceYears || 0
        }));
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, [workerId]);

  const handleChange = (e) => {
    setWorker({
      ...worker,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    const payload = {
      ...worker,
      age: parseInt(worker.age) || 18,
      experienceYears: parseInt(worker.experienceYears) || 0,
    };

    console.log("Sending Data:", payload);

    try {
      const response = await updateWorkerProfile(workerId, payload);
      console.log(response.data);
      alert(t("workerProfile.updateSuccess"));
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.data);
      if (error.response?.data?.errors) {
        alert(t("workerProfile.validationError") + JSON.stringify(error.response.data.errors));
      } else {
        alert(t("workerProfile.updateFailed") + JSON.stringify(error.response?.data || error.message));
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow">

          <div className="card-header bg-warning">
            <h3>{t("workerProfile.title")}</h3>
          </div>

          <div className="card-body">

            <form onSubmit={saveProfile}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>{t("workerProfile.name")}</label>

                  <input
                    className="form-control"
                    name="workerName"
                    value={worker.workerName}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">
                  <label>{t("workerProfile.age")}</label>

                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={worker.age}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">
                  <label>{t("workerProfile.gender")}</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={worker.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">{t("workerProfile.male")}</option>
                    <option value="Female">{t("workerProfile.female")}</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>{t("workerProfile.skill")}</label>
                  <select
                    className="form-select"
                    name="skill"
                    value={worker.skill}
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

                <div className="col-md-6 mb-3">
                  <label>{t("workerProfile.experience")}</label>

                  <input
                    type="number"
                    className="form-control"
                    name="experienceYears"
                    value={worker.experienceYears}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">
                  <label>{t("workerProfile.currentLocation")}</label>

                  <input
                    className="form-control"
                    name="currentLocation"
                    value={worker.currentLocation}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">
                  <label>{t("workerProfile.village")}</label>

                  <input
                    className="form-control"
                    name="village"
                    value={worker.village}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">
                  <label>{t("workerProfile.district")}</label>

                  <input
                    className="form-control"
                    name="district"
                    value={worker.district}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-12 mb-3">
                  <label>{t("workerProfile.address")}</label>

                  <textarea
                    rows="3"
                    className="form-control"
                    name="address"
                    value={worker.address}
                    onChange={handleChange}
                  ></textarea>

                </div>

              </div>

              <button className="btn btn-warning w-100">
                {t("workerProfile.saveProfile")}
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;
