package com.money.management.service;

import com.money.management.dto.JwtAuthenticationResponse;
import com.money.management.dto.RefreshTokenRequest;
import com.money.management.dto.SignInRequest;
import com.money.management.dto.SignUpRequest;
import com.money.management.entity.User;

public interface AuthenticationService {
	User signup(SignUpRequest signUpRequest);
	
	JwtAuthenticationResponse sign(SignInRequest signInRequest);
	
	JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
