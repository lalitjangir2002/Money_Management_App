package com.money.management;

import com.money.management.entity.Role;
import com.money.management.entity.User;
import com.money.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ManagementApplication implements CommandLineRunner {
	private final UserRepository userRepository;
	
	public ManagementApplication(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(ManagementApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
	User adminAccount = userRepository.findByRole(Role.ADMIN);
	
	if(adminAccount == null){
		User user = new User();
        
        user.setEmail("admin@gmail.com");
		user.setFirstName("admin");
		user.setLastName("admin");
        user.setPassword(new BCryptPasswordEncoder().encode("123"));
        user.setRole(Role.ADMIN);
        
        userRepository.save(user);
	}
	}
}
