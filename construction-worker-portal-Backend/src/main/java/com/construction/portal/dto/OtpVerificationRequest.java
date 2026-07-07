package com.construction.portal.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class OtpVerificationRequest {

    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter a valid mobile number"
    )
    private String mobileNumber;

    @Pattern(
            regexp = "^\\d{6}$",
            message = "OTP must be 6 digits"
    )
    private String otp;
}