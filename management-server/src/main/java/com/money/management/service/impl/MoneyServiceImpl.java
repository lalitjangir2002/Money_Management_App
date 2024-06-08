package com.money.management.service.impl;

import com.money.management.entity.Money;
import com.money.management.entity.User;
import com.money.management.repository.MoneyRepository;
import com.money.management.repository.UserRepository;
import com.money.management.service.MoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoneyServiceImpl implements MoneyService {
    @Autowired
    private MoneyRepository moneyRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Money uploadDetails(Money money) {
        return moneyRepository.save(money);
    }

    @Override
    public List<Money> getAllDetails() {
        return moneyRepository.findAll();
    }

    @Override
    public boolean deleteAmount(Long id) {
        if (moneyRepository.existsById(id)) {
            moneyRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Override
    public List<Money> getMoneyEntriesForUsers(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return moneyRepository.findByUser(user);
    }
    
    @Override
    public Money addMoneyToUsers(String email, Money money) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        money.setUser(user);
        return moneyRepository.save(money);
    }
}
