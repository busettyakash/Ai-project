package com.salesshop.controller;

import com.salesshop.dto.*;
import com.salesshop.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
            "status", "ok",
            "time", LocalDateTime.now().toString()
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        try {
            // Validate
            if (req.getName() == null || req.getName().isBlank()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Full name is required"));
            }
            if (req.getEmail() == null || req.getEmail().isBlank()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Email is required"));
            }
            if (req.getShopName() == null || req.getShopName().isBlank()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Shop name is required"));
            }
            if (req.getGstNumber() == null || req.getGstNumber().isBlank()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("GST number is required"));
            }
            if (req.getPassword() == null || req.getPassword().length() < 8) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Password must be at least 8 characters"));
            }

            AuthResponse response = authService.signup(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("already exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Something went wrong. Please try again."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            if (req.getEmail() == null || req.getEmail().isBlank()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Email is required"));
            }
            if (req.getPassword() == null || req.getPassword().isBlank()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Password is required"));
            }

            AuthResponse response = authService.login(req);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Invalid")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Something went wrong. Please try again."));
        }
    }
}
