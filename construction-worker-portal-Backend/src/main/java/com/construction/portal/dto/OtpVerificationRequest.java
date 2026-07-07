package com.construction.portal.dto;

import lombok.Data;

@Data
public class OtpVerificationRequest {

    private String mobileNumber;
    private String otp;

}