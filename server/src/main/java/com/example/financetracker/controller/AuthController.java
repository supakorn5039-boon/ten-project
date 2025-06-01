package com.example.financetracker.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.financetracker.dto.LoginRequest;
import com.example.financetracker.dto.LoginResponse;
import com.example.financetracker.dto.RegisterRequest;
import com.example.financetracker.dto.RegisterResponse;
import com.example.financetracker.entity.User;
import com.example.financetracker.security.UserService;
import com.example.financetracker.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final com.example.financetracker.util.JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            User registeredUser = userService.registerUser(request.getEmail(),
                    request.getUsername(), request.getPassword());

            String token = jwtUtil.generateToken(registeredUser.getUsername());

            RegisterResponse response = new RegisterResponse(registeredUser.getUsername(), token);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            Map<String, String> errors = new HashMap<>();
            errors.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errors);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            User loginUser = userService.loginUser(request.getEmail(), request.getPassword());
            String token = jwtUtil.generateToken(loginUser.getUsername());

            return ResponseEntity.ok(new LoginResponse(loginUser.getUsername(), token));

        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
