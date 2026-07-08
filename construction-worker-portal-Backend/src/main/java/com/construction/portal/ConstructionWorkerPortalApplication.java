package com.construction.portal;

import com.construction.portal.entity.Role;
import com.construction.portal.entity.User;
import com.construction.portal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ConstructionWorkerPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConstructionWorkerPortalApplication.class, args);
	}

	@Bean
	CommandLineRunner initAdmin(UserRepository userRepository) {
		return args -> {
			if (userRepository.findAll().stream().noneMatch(u -> u.getRole() == Role.ADMIN)) {
				User admin = new User();
				admin.setMobileNumber("9999999999");
				admin.setRole(Role.ADMIN);
				userRepository.save(admin);
				System.out.println("✅ Default Admin Created: Mobile Number -> 9999999999");
			}
		};
	}

}
