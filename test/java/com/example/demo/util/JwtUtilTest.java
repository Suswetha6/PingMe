package com.example.demo.util;

import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.Field;

import org.junit.jupiter.api.Test;

public class JwtUtilTest {

    private void setPrivateField(Object target, String fieldName, Object value) throws Exception {
        Field f = target.getClass().getDeclaredField(fieldName);
        f.setAccessible(true);
        f.set(target, value);
    }

    @Test
    public void generateAndParseToken() throws Exception {
        JwtUtil jwtUtil = new JwtUtil();

        // 64-char secret for HS512 (512 bits)
        String secret = "0123456789012345678901234567890123456789012345678901234567890123";
        setPrivateField(jwtUtil, "secret", secret);
        setPrivateField(jwtUtil, "expiration", 3600000); // 1 hour

        String email = "user@example.com";
        String token = jwtUtil.generateToken(email);

        assertNotNull(token, "Generated token should not be null");
        assertTrue(jwtUtil.validateToken(token), "Token should validate");
        assertEquals(email, jwtUtil.getUsernameFromToken(token), "Username extracted should match original email");
    }

    @Test
    public void validateTamperedToken() throws Exception {
        JwtUtil jwtUtil = new JwtUtil();
        String secret = "0123456789012345678901234567890123456789012345678901234567890123";
        setPrivateField(jwtUtil, "secret", secret);
        setPrivateField(jwtUtil, "expiration", 3600000);

        String token = jwtUtil.generateToken("alice@example.com");
        String tampered = token + "x"; // simple tamper

        assertFalse(jwtUtil.validateToken(tampered), "Tampered token should not validate");
    }

    @Test
    public void validateWithDifferentSecretFails() throws Exception {
        JwtUtil jwtUtilGood = new JwtUtil();
        String goodSecret = "0123456789012345678901234567890123456789012345678901234567890123";
        setPrivateField(jwtUtilGood, "secret", goodSecret);
        setPrivateField(jwtUtilGood, "expiration", 3600000);

        String token = jwtUtilGood.generateToken("bob@example.com");

        JwtUtil jwtUtilBad = new JwtUtil();
        // different secret (still 64 chars)
        String badSecret = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        setPrivateField(jwtUtilBad, "secret", badSecret);
        setPrivateField(jwtUtilBad, "expiration", 3600000);

        assertFalse(jwtUtilBad.validateToken(token), "Token validated with wrong secret should fail");
    }
}
