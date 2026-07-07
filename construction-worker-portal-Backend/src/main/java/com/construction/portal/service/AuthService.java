package com.construction.portal.service;

import com.construction.portal.dto.LoginRequest;
import com.construction.portal.dto.OtpVerificationRequest;
import com.construction.portal.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    String sendOtp(LoginRequest request);

    com.construction.portal.dto.LoginResponse verifyOtp(OtpVerificationRequest request);

}