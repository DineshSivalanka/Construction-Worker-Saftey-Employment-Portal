import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    role: "WORKER",
  });
  
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Initialize reCAPTCHA on component mount
  useEffect(() => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.error("Error clearing recaptcha", e);
      }
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved
      },
      'expired-callback': () => {
        // Response expired.
      }
    });

    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {}
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendOtpHandler = async (e) => {
    e.preventDefault();

    if (formData.mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const phoneNumber = "+91" + formData.mobileNumber;
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert("OTP Sent via Firebase!");
    } catch (error) {
      console.error(error);
      alert("Firebase Error: " + error.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then(function(widgetId) {
          window.grecaptcha.reset(widgetId);
        });
      }
    }
  };

  const verifyOtpAndRegister = async (e) => {
    e.preventDefault();
    if (!confirmationResult) return;

    try {
      // 1. Verify OTP with Firebase
      await confirmationResult.confirm(otp);

      // 2. Register User with our backend
      const response = await registerUser(formData);

      alert(response.data || "Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      let msg = "Invalid OTP or backend error";
      if (error.response && error.response.data) {
        msg = typeof error.response.data === 'string' ? error.response.data : error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        msg = error.message;
      }
      alert("Registration Failed: " + msg);
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
                <form>
                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text">+91</span>
                      <input
                        type="text"
                        className="form-control"
                        name="mobileNumber"
                        placeholder="Enter 10-digit Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        disabled={otpSent}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Select Role</label>
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={otpSent}
                    >
                      <option value="WORKER">Worker</option>
                      <option value="CONTRACTOR">Contractor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  <div id="recaptcha-container"></div>

                  {!otpSent ? (
                    <button
                      className="btn btn-warning w-100 fw-bold"
                      onClick={sendOtpHandler}
                    >
                      Send OTP via SMS
                    </button>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Firebase OTP</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter the 6-digit OTP from SMS"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        className="btn btn-success w-100 fw-bold"
                        onClick={verifyOtpAndRegister}
                      >
                        Verify & Register
                      </button>
                    </>
                  )}
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
