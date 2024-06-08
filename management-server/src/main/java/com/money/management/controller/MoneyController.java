package com.money.management.controller;

import com.money.management.entity.Money;
import com.money.management.service.MoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/money")
@CrossOrigin(origins = "http://localhost:3000")
public class MoneyController {
    @Autowired
    private MoneyService moneyService;

    @PostMapping("/upload")
    public ResponseEntity<String> saveMoneyDetails(@RequestBody Money money){
        moneyService.uploadDetails(money);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Money>> getAllMoney(){
        List<Money> listData = moneyService.getAllDetails();

        return new ResponseEntity<>(listData,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        boolean isRemoved = moneyService.deleteAmount(id);
        if (!isRemoved) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<Money>> getMoneyEntriesForUser(@AuthenticationPrincipal UserDetails userDetails) {
        List<Money> userMoneyEntries = moneyService.getMoneyEntriesForUsers(userDetails.getUsername());
        return new ResponseEntity<>(userMoneyEntries, HttpStatus.OK);
    }
    
    @PostMapping("/user/upload")
    public ResponseEntity<Money> addMoneyEntryForUser(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Money money) {
        Money createdMoney = moneyService.addMoneyToUsers(userDetails.getUsername(), money);
        return new ResponseEntity<>(createdMoney, HttpStatus.CREATED);
    }
}
