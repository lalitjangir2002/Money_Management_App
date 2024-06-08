package com.money.management.repository;

import com.money.management.entity.Money;
import com.money.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoneyRepository extends JpaRepository<Money,Long> {
	List<Money> findByUser(User user);
}
