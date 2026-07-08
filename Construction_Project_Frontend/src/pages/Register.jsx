import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { registerUser } from "../services/authService";
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (userId && role) {
      if (role === "WORKER") navigate("/worker/dashboard");
      else if (role === "CONTRACTOR") navigate("/contractor/dashboard");
      else if (role === "ADMIN") navigate("/admin/dashboard");
    }
  }, [navigate]);

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
        } catch (e) { }
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
        window.recaptchaVerifier.render().then(function (widgetId) {
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
              <div className="card-header text-center text-white" style={{ backgroundColor: '#D8125B' }}>
                <h3>{t("register.title")}</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">{t("register.mobileNumber")}</label>
                    <div className="input-group">
                      <span className="input-group-text">+91</span>
                      <input
                        type="text"
                        className="form-control"
                        name="mobileNumber"
                        placeholder={t("register.enterMobile")}
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        disabled={otpSent}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">{t("register.selectRole")}</label>
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={otpSent}
                    >
                      <option value="WORKER">{t("register.worker")}</option>
                      <option value="CONTRACTOR">{t("register.contractor")}</option>
                      <option value="ADMIN">{t("register.admin")}</option>
                    </select>
                  </div>

                  <div id="recaptcha-container"></div>

                  {!otpSent ? (
                    <button
                      className="btn w-100 text-white fw-bold"
                      style={{ backgroundColor: '#D8125B' }}
                      onClick={sendOtpHandler}
                    >
                      {t("register.sendOtp")}
                    </button>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label className="form-label">{t("register.firebaseOtp")}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("register.enterOtp")}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        className="btn w-100 text-white fw-bold"
                        style={{ backgroundColor: '#D8125B' }}
                        onClick={verifyOtpAndRegister}
                      >
                        {t("register.verifyRegister")}
                      </button>
                    </>
                  )}
                </form>

                <div className="mt-4 text-center">
                  <span className="text-muted">{t("register.hasAccount")}</span>
                  <Link to="/login" style={{ color: '#D8125B', fontWeight: 'bold', textDecoration: 'none' }}>
                    {t("register.login")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
