package com.salesshop.service;

import com.salesshop.dto.AuthResponse;
import com.salesshop.dto.LoginRequest;
import com.salesshop.dto.SignupRequest;
import com.salesshop.entity.User;
import com.salesshop.repository.UserRepository;
import com.salesshop.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse signup(SignupRequest req) {
        // Check if email exists
        if (userRepository.existsByEmail(req.getEmail().trim().toLowerCase())) {
            throw new RuntimeException("An account with this email already exists");
        }

        // Hash password and save
        String hash = passwordEncoder.encode(req.getPassword());
        User user = new User(
            req.getName().trim(),
            req.getEmail().trim().toLowerCase(),
            req.getShopName().trim(),
            req.getGstNumber().trim().toUpperCase(),
            hash
        );
        user = userRepository.save(user);

        // Generate token
        String token = jwtUtil.generateToken(user.getId(), user.getEmail());

        return new AuthResponse(
            "Account created successfully!",
            buildUserMap(user),
            token
        );
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail().trim().toLowerCase())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail());

        return new AuthResponse(
            "Welcome back, " + user.getFullName() + "!",
            buildUserMap(user),
            token
        );
    }

    private Map<String, Object> buildUserMap(User user) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", user.getId());
        map.put("name", user.getFullName());
        map.put("email", user.getEmail());
        map.put("shopName", user.getShopName());
        map.put("gstNumber", user.getGstNumber());
        return map;
    }
}
