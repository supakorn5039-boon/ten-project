package com.example.financetracker.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import com.example.financetracker.dto.LoginRequest;
import com.example.financetracker.dto.LoginResponse;
import com.example.financetracker.dto.RegisterRequest;
import com.example.financetracker.entity.User;
import com.example.financetracker.security.UserService;
import com.example.financetracker.util.JwtUtil;

class AuthControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUserSuccess() {
        RegisterRequest request = new RegisterRequest("test@example.com", "testUser", "password");
        User mockUser = new User();
        mockUser.setUsername("testUser");

        when(userService.registerUser(request.getEmail(), request.getUsername(),
                request.getPassword())).thenReturn(mockUser);

        ResponseEntity<?> response = authController.registerUser(request);

        assertEquals(201, response.getStatusCode().value());

        @SuppressWarnings("unchecked")
        Map<String, String> body = (Map<String, String>) response.getBody();

        assertNotNull(body);
        assertTrue(body.containsKey("message"));
        assertEquals("Register success", body.get("message"));
    }


    @Test
    void testRegisterUserFailure() {

        RegisterRequest request = new RegisterRequest("test@example.com", "testUser", "password");

        when(userService.registerUser(request.getEmail(), request.getUsername(),
                request.getPassword())).thenThrow(new RuntimeException("User already exists"));

        ResponseEntity<?> response = authController.registerUser(request);

        assertEquals(400, response.getStatusCode().value());
    }

    @Test
    void testLoginUserSuccess() {

        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");

        User mockUser = new User();
        mockUser.setUsername("testUser");
        mockUser.setEmail("test@example.com");

        when(userService.loginUser(request.getEmail(), request.getPassword())).thenReturn(mockUser);
        when(jwtUtil.generateToken("testUser")).thenReturn("mock-jwt-token");

        ResponseEntity<?> response = authController.loginUser(request);

        assertEquals(200, response.getStatusCode().value());
        LoginResponse body = (LoginResponse) response.getBody();
        assertNotNull(body);
        assertEquals("testUser", body.getUsername());
        assertEquals("mock-jwt-token", body.getToken());
    }

    @Test
    void testLoginUserFailure() {

        LoginRequest request = new LoginRequest();
        request.setEmail("wrong@example.com");
        request.setPassword("wrongpassword");

        when(userService.loginUser(request.getEmail(), request.getPassword()))
                .thenThrow(new RuntimeException("Invalid credentials"));

        ResponseEntity<?> response = authController.loginUser(request);

        assertEquals(400, response.getStatusCode().value());
    }
}
