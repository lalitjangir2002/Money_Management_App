package com.money.management.service;

import com.money.management.entity.Money;

import java.util.List;

public interface MoneyService {
    Money uploadDetails(Money money);

    List<Money> getAllDetails();

    boolean deleteAmount(Long id);

}
