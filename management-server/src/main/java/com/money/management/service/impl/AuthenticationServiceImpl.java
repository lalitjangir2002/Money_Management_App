package com.money.management.service.impl;

import com.money.management.dto.JwtAuthenticationResponse;
import com.money.management.dto.RefreshTokenRequest;
import com.money.management.dto.SignInRequest;
import com.money.management.dto.SignUpRequest;
import com.money.management.entity.Role;
import com.money.management.entity.User;
import com.money.management.repository.UserRepository;
import com.money.management.service.AuthenticationService;
import com.money.management.service.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JWTService jwtService;
	
	public AuthenticationServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}
	
	public User signup(SignUpRequest signUpRequest){
		User user = new User();
        
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		
        return userRepository.save(user);
	}
	
	public JwtAuthenticationResponse sign(SignInRequest signInRequest){
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),
				signInRequest.getPassword()));
		
		var user = userRepository.findByEmail(signInRequest.getEmail()).orElseThrow(()->new IllegalArgumentException(("Invalid Email and Password")));
		
		var jwt = jwtService.generateToken(user);
		var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);
		
		JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
		
		jwtAuthenticationResponse.setToken(jwt);
		jwtAuthenticationResponse.setRefreshToken(refreshToken);
		jwtAuthenticationResponse.setEmail(user.getEmail());
		jwtAuthenticationResponse.setFirstName(user.getFirstName());
		jwtAuthenticationResponse.setLastName(user.getLastName());
		
		return jwtAuthenticationResponse;
	}
	
	public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
		String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
		User user = userRepository.findByEmail(userEmail).orElseThrow();
		if(jwtService.isTokenValid(refreshTokenRequest.getToken(),user)){
			var jwt = jwtService.generateToken(user);
            
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
			jwtAuthenticationResponse.setEmail(user.getEmail());
			jwtAuthenticationResponse.setFirstName(user.getFirstName());
			jwtAuthenticationResponse.setLastName(user.getLastName());
            
            return jwtAuthenticationResponse;
		}
		return null;
	}
}
