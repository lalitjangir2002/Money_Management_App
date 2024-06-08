package com.money.management.repository;

import com.money.management.entity.Role;
import com.money.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
	Optional<User> findByEmail(String email);
	User findByRole(Role role);
}
