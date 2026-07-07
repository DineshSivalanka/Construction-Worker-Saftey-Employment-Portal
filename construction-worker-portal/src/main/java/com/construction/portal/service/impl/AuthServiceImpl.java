package com.construction.portal.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.construction.portal.dto.LoginRequest;
import com.construction.portal.dto.OtpVerificationRequest;
import com.construction.portal.dto.RegisterRequest;
import com.construction.portal.entity.User;
import com.construction.portal.repository.UserRepository;
import com.construction.portal.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final Map<String, String> otpStore = new HashMap<>();

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return "Mobile number already registered";
        }

        User user = new User();
        user.setMobileNumber(request.getMobileNumber());
        user.setRole(request.getRole());

        userRepository.save(user);

        return "Registration Successful";
    }

    @Override
    public String sendOtp(LoginRequest request) {

        if (!userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return "User not found";
        }

        // Dummy OTP for project
        String otp = "123456";

        otpStore.put(request.getMobileNumber(), otp);

        return "OTP Sent Successfully : " + otp;
    }

    @Override
    public String verifyOtp(OtpVerificationRequest request) {

        String storedOtp = otpStore.get(request.getMobileNumber());

        if (storedOtp == null) {
            return "OTP Expired";
        }

        if (!storedOtp.equals(request.getOtp())) {
            return "Invalid OTP";
        }

        otpStore.remove(request.getMobileNumber());

        return "Login Successful";
    }
}