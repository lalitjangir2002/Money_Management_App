package com.money.management.service;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JWTService {
	String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails);
	String extractUserName(String token);
	String generateToken(UserDetails userDetails);
	boolean isTokenValid(String token,UserDetails userDetails);
	boolean isTokenExpired(String token);
}
