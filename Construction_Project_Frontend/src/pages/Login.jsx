import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { sendOtp, verifyOtp } from "../services/authService";
import { useTranslation } from "react-i18next";

function Login() {
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

    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);



    const sendOtpHandler = async () => {
        if (mobileNumber.length !== 10) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }

        try {
            await sendOtp({ mobileNumber });
            setOtpSent(true);
            alert("OTP Sent!");
        } catch (error) {
            console.error(error);
            alert("Error sending OTP");
        }
    };

    const verifyOtpHandler = async () => {
        try {
            const response = await verifyOtp({
                mobileNumber: mobileNumber,
                otp: otp
            });

            const data = response.data;
            alert(data.message);

            localStorage.setItem("userId", data.userId);
            localStorage.setItem("role", data.role);

            if (data.role === "WORKER") {
                navigate("/worker/dashboard");
            } else if (data.role === "CONTRACTOR") {
                navigate("/contractor/dashboard");
            } else if (data.role === "ADMIN") {
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error(error);
            let msg = "Invalid OTP or backend error";
            if (error.response && error.response.data) {
                msg = typeof error.response.data === 'string' ? error.response.data : error.response.data.message || JSON.stringify(error.response.data);
            } else if (error.message) {
                msg = error.message;
            }
            alert("Login Failed: " + msg);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card shadow-lg">
                            <div className="card-header text-center text-white" style={{ backgroundColor: '#D8125B' }}>
                                <h3>{t("login.title")}</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label>{t("login.mobileNumber")}</label>
                                    <div className="input-group">
                                        <span className="input-group-text">+91</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={t("login.enterMobile")}
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                </div>


                                {!otpSent ? (
                                    <button className="btn w-100 text-white fw-bold" style={{ backgroundColor: '#D8125B' }} onClick={sendOtpHandler}>
                                        {t("login.sendOtp")}
                                    </button>
                                ) : (
                                    <>
                                        <div className="mt-4 mb-3">
                                            <label>{t("login.firebaseOtp")}</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={t("login.enterOtp")}
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </div>
                                        <button className="btn w-100 text-white fw-bold" style={{ backgroundColor: '#D8125B' }} onClick={verifyOtpHandler}>
                                            {t("login.verifyLogin")}
                                        </button>
                                    </>
                                )}

                                <div className="mt-4 text-center">
                                    <span className="text-muted">{t("login.noAccount")}</span>
                                    <Link to="/register" style={{ color: '#D8125B', fontWeight: 'bold', textDecoration: 'none' }}>
                                        {t("login.createAccount")}
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

export default Login;
