import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    role: "WORKER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      alert(response.data);

      navigate("/login");
    } catch (error) {
      const data = error.response?.data;
      alert(
        (typeof data === "object" ? JSON.stringify(data) : data) || "Registration Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="row justify-content-center mt-5">

          <div className="col-md-5">

            <div className="card shadow-lg border-0">

              <div className="card-header bg-warning text-dark text-center">

                <h3>Register</h3>

              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label">
                      Mobile Number
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="mobileNumber"
                      placeholder="Enter Mobile Number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label">
                      Select Role
                    </label>

                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="WORKER">
                        Worker
                      </option>

                      <option value="CONTRACTOR">
                        Contractor
                      </option>

                      <option value="ADMIN">
                        Admin
                      </option>

                    </select>

                  </div>

                  <button
                    className="btn btn-warning w-100 fw-bold"
                  >
                    Register
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Register;
