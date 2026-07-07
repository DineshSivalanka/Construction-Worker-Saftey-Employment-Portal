package com.construction.portal.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class LoginRequest {

    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter a valid mobile number"
    )
    private String mobileNumber;
}