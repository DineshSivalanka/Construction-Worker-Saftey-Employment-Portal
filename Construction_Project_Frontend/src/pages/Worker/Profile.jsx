import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getWorkerProfile,
  updateWorkerProfile,
} from "../../services/workerService";

function Profile() {

  // Temporary worker id
  const workerId = 1;

  const [worker, setWorker] = useState({
    workerName: "",
    age: "",
    gender: "",
    address: "",
    village: "",
    district: "",
    skill: "",
    experienceYears: "",
    currentLocation: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getWorkerProfile(workerId);
      setWorker(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setWorker({
      ...worker,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      await updateWorkerProfile(workerId, worker);
      alert("Profile Updated Successfully");
    } catch (error) {
      alert("Update Failed");
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
