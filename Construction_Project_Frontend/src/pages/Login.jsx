import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { verifyOtp } from "../services/authService"; // We will still use this to establish session with our Spring Boot backend

function Login() {
    const navigate = useNavigate();

    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);

    // Initialize reCAPTCHA on component mount
    useEffect(() => {
        // Clear any old verifier to prevent "reCAPTCHA client element has been removed" error
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

    const sendOtpHandler = async () => {
        if (mobileNumber.length !== 10) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }

        const phoneNumber = "+91" + mobileNumber; // Assuming India for this project
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            alert("OTP Sent via Firebase!");
        } catch (error) {
            console.error(error);
            alert("Firebase Error: " + error.message + "\n\nPlease ensure Phone Auth is enabled and 'localhost' is added to Authorized Domains in Firebase.");
            // Reset reCAPTCHA if it failed
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.render().then(function(widgetId) {
                    window.grecaptcha.reset(widgetId);
                });
            }
        }
    };

    const verifyOtpHandler = async () => {
        if (!confirmationResult) return;

        try {
            // 1. Verify OTP with Firebase
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            
            // Optional: get Firebase ID Token if you want to verify on backend securely
            // const idToken = await user.getIdToken();

            // 2. Notify our Spring Boot backend that verification was successful
            // We pass the verified mobile number so the backend can log them in.
            const response = await verifyOtp({
                mobileNumber: mobileNumber,
                otp: "FIREBASE_VERIFIED" // Our backend will bypass normal OTP check if it sees this
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
                            <div className="card-header bg-warning text-center">
                                <h3>Login (Firebase Auth)</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label>Mobile Number (10 digits)</label>
                                    <div className="input-group">
                                        <span className="input-group-text">+91</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Mobile Number"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div id="recaptcha-container"></div>

                                {!otpSent ? (
                                    <button className="btn btn-warning w-100" onClick={sendOtpHandler}>
                                        Send OTP via SMS
                                    </button>
                                ) : (
                                    <>
                                        <div className="mt-4 mb-3">
                                            <label>Firebase OTP</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter the 6-digit OTP from SMS"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </div>
                                        <button className="btn btn-success w-100" onClick={verifyOtpHandler}>
                                            Verify & Login
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
