package com.salesshop.dto;

import java.util.Map;

public class AuthResponse {
    private String message;
    private Map<String, Object> user;
    private String token;

    public AuthResponse(String message, Map<String, Object> user, String token) {
        this.message = message;
        this.user = user;
        this.token = token;
    }

    public String getMessage() { return message; }
    public Map<String, Object> getUser() { return user; }
    public String getToken() { return token; }
}
