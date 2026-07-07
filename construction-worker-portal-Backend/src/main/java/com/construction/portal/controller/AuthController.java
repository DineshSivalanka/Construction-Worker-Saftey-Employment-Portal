package com.construction.portal.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.construction.portal.dto.LoginRequest;
import com.construction.portal.dto.OtpVerificationRequest;
import com.construction.portal.dto.RegisterRequest;
import com.construction.portal.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/send-otp")
    public String sendOtp(@Valid @RequestBody LoginRequest request) {
        return authService.sendOtp(request);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@Valid @RequestBody OtpVerificationRequest request) {
        return authService.verifyOtp(request);
    }
}