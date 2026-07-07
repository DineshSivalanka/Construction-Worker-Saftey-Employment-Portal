import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getWorkerProfile,
  updateWorkerProfile,
} from "../../services/workerService";

function Profile() {

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
      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.data);
      if (error.response?.data?.errors) {
        alert("Validation Error: " + JSON.stringify(error.response.data.errors));
      } else {
        alert("Update Failed: " + JSON.stringify(error.response?.data || error.message));
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow">

          <div className="card-header bg-warning">

            <h3>Worker Profile</h3>

          </div>

          <div className="card-body">

            <form onSubmit={saveProfile}>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label>Name</label>

                  <input
                    className="form-control"
                    name="workerName"
                    value={worker.workerName}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Age</label>

                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={worker.age}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Gender</label>

                  <select
                    className="form-select"
                    name="gender"
                    value={worker.gender}
                    onChange={handleChange}
                  >

                    <option>Male</option>
                    <option>Female</option>

                  </select>

                </div>

                <div className="col-md-6 mb-3">

                  <label>Skill</label>

                  <select
                    className="form-select"
                    name="skill"
                    value={worker.skill}
                    onChange={handleChange}
                  >

                    <option>Mason</option>
                    <option>Carpenter</option>
                    <option>Electrician</option>
                    <option>Painter</option>
                    <option>Plumber</option>
                    <option>Steel Fixer</option>
                    <option>Tiles Worker</option>

                  </select>

                </div>

                <div className="col-md-6 mb-3">

                  <label>Experience (Years)</label>

                  <input
                    type="number"
                    className="form-control"
                    name="experienceYears"
                    value={worker.experienceYears}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Current Location</label>

                  <input
                    className="form-control"
                    name="currentLocation"
                    value={worker.currentLocation}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Village</label>

                  <input
                    className="form-control"
                    name="village"
                    value={worker.village}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>District</label>

                  <input
                    className="form-control"
                    name="district"
                    value={worker.district}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-12 mb-3">

                  <label>Address</label>

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
                Save Profile
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;
