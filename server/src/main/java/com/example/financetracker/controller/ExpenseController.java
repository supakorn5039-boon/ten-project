package com.example.financetracker.controller;

import com.example.financetracker.entity.Expense;
import com.example.financetracker.reposity.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    public ExpenseRepository expenseRepository;

    @GetMapping
    public List<Expense> getAllExpense() {
        return expenseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Expense> getExpenseById(@PathVariable Long id) {
        return expenseRepository.findById(id);
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id  , @RequestBody Expense updatedExpense) {
        return expenseRepository.findById(id).map(expense -> {
            expense.setName(updatedExpense.getName());
            expense.setAmount(updatedExpense.getAmount());
            expense.setDate(updatedExpense.getDate());
            return expenseRepository.save(expense);
        }).orElseThrow(() -> new RuntimeException("Expense not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }



}
