package com.construction.portal.dto;

import com.construction.portal.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String mobileNumber;
    private Role role;

}