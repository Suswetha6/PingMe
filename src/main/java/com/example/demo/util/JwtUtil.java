package com.example.demo.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import javax.crypto.SecretKey;

@Component
public class JwtUtil {
  @Value("${jwt.secret}")  // Secret key from application.yml
    private String secret;

    @Value("${jwt.expiration}")  // Expiration time (e.g., 86400000 ms = 24 hours)
    private int expiration;
    public String generateToken(String email) {
      SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(key, SignatureAlgorithm.HS512)
        .compact();
    }

}
