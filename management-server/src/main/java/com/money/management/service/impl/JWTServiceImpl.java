	package com.money.management.service.impl;
	
	import com.money.management.service.JWTService;
	import io.jsonwebtoken.Claims;
	import io.jsonwebtoken.Jwts;
	import io.jsonwebtoken.SignatureAlgorithm;
	import io.jsonwebtoken.io.Decoders;
	import io.jsonwebtoken.security.Keys;
	import org.springframework.security.core.userdetails.UserDetails;
	import org.springframework.stereotype.Service;
	
	import java.security.Key;
	import java.util.Date;
	import java.util.Map;
	import java.util.function.Function;
	
	@Service
	public class JWTServiceImpl implements JWTService {
		private final String SECRET_KEY = "VkhvkeJZSJ4hG07k6EPz2l6LET7878jsjnW678asdsfergbrhtrrFEFEFG";
		
		public String generateToken(UserDetails userDetails) {
			return Jwts.builder()
					.setSubject(userDetails.getUsername())
					.setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
					.signWith(getSignInKey(), SignatureAlgorithm.HS256)
					.compact();
		}
		
		public String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails) {
			return Jwts.builder()
					.setClaims(extraClaims)
					.setSubject(userDetails.getUsername())
					.setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis() + 604800000))
					.signWith(getSignInKey(), SignatureAlgorithm.HS256)
					.compact();
		}
		
		public String extractUserName(String token) {
			return extractClaim(token, Claims::getSubject);
		}
		
		private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
			final Claims claims = extractAllClaims(token);
			return claimsResolver.apply(claims);
		}
		
		private Key getSignInKey() {
			byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
			return Keys.hmacShaKeyFor(keyBytes);
		}
		
		private Claims extractAllClaims(String token) {
			return Jwts.parserBuilder()
					.setSigningKey(getSignInKey())
					.build()
					.parseClaimsJws(token)
					.getBody();
		}
		
		public boolean isTokenValid(String token, UserDetails userDetails) {
			final String username = extractUserName(token);
			return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
		}
		
		public boolean isTokenExpired(String token) {
			return extractClaim(token, Claims::getExpiration).before(new Date());
		}
	}
