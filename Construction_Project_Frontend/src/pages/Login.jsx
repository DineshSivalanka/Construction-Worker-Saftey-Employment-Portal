import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { sendOtp, verifyOtp } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState("");

    const [otpSent, setOtpSent] = useState(false);

    const sendOtpHandler = async () => {

        try {

            const response = await sendOtp({
                mobileNumber
            });

            alert(response.data);

            setOtpSent(true);

        } catch (error) {

            alert(error.response?.data || "Unable to send OTP");

        }

    };

    const verifyOtpHandler = async () => {
        try {
            const response = await verifyOtp({
                mobileNumber,
                otp,
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
            alert(error.response?.data || "Invalid OTP");
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

                                <h3>Login</h3>

                            </div>

                            <div className="card-body">

                                <div className="mb-3">

                                    <label>Mobile Number</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Mobile Number"
                                        value={mobileNumber}
                                        onChange={(e) =>
                                            setMobileNumber(e.target.value)
                                        }
                                    />

                                </div>

                                {

                                    !otpSent ?

                                        <button
                                            className="btn btn-warning w-100"
                                            onClick={sendOtpHandler}
                                        >

                                            Send OTP

                                        </button>

                                        :

                                        <>

                                            <div className="mt-4 mb-3">

                                                <label>OTP</label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter OTP"
                                                    value={otp}
                                                    onChange={(e) =>
                                                        setOtp(e.target.value)
                                                    }
                                                />

                                            </div>

                                            <button
                                                className="btn btn-success w-100"
                                                onClick={verifyOtpHandler}
                                            >

                                                Verify OTP

                                            </button>

                                        </>

                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Login;
