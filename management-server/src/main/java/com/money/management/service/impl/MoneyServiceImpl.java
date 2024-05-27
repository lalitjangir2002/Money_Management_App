package com.money.management.service.impl;

import com.money.management.entity.Money;
import com.money.management.repository.MoneyRepository;
import com.money.management.service.MoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoneyServiceImpl implements MoneyService {
    @Autowired
    private MoneyRepository moneyRepository;

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
}
