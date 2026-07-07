package com.construction.portal.dto;

public class LoginResponse {

    private Long userId;
    private String role;
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(Long userId, String role, String message) {
        this.userId = userId;
        this.role = role;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
