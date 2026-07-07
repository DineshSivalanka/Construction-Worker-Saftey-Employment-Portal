import api from "./api";

// Register
export const registerUser = async (data) => {
  return await api.post("/auth/register", data);
};

// Send OTP
export const sendOtp = async (data) => {
  return await api.post("/auth/send-otp", data);
};

// Verify OTP
export const verifyOtp = async (data) => {
  return await api.post("/auth/verify-otp", data);
};
