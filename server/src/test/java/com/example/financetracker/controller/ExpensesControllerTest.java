package com.example.financetracker.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.data.domain.Sort;
import com.example.financetracker.entity.Expense;
import com.example.financetracker.exception.ResourceNotFoundException;
import com.example.financetracker.reposity.ExpenseRepository;

public class ExpensesControllerTest {

    private ExpenseController expenseController;
    private ExpenseRepository expenseRepository;

    @BeforeEach
    public void setUp() {
        expenseRepository = mock(ExpenseRepository.class);
        expenseController = new ExpenseController(expenseRepository);
    }

    @Test
    public void testGetAllExpense() {
        Expense e1 = new Expense(1L, "Groceries", 50.0, LocalDate.now());
        Expense e2 = new Expense(2L, "Transport", 20.0, LocalDate.now());

        List<Expense> mockList = Arrays.asList(e1, e2);

        when(expenseRepository.findAll(ArgumentMatchers.any(Sort.class))).thenReturn(mockList);

        List<Expense> result = expenseController.getAllExpense();

        assertEquals(2, result.size());
        verify(expenseRepository, times(1)).findAll(ArgumentMatchers.any(Sort.class));
    }

    @Test
    public void testGetExpenseById_Found() {
        Expense mockExpense = new Expense(1L, "Groceries", 50.0, LocalDate.now());

        when(expenseRepository.findById(1L)).thenReturn(Optional.of(mockExpense));

        Expense result = expenseController.getExpenseById(1L);

        assertEquals("Groceries", result.getName());
        assertEquals(50.0, result.getAmount());
    }

    @Test
    public void testGetExpenseById_NotFound() {
        when(expenseRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            expenseController.getExpenseById(99L);
        });
    }

    @Test
    public void testCreateExpense() {
        Expense newExpense = new Expense(null, "Books", 30.0, LocalDate.now());
        Expense saveExpense = new Expense(1L, "Books", 30.0, LocalDate.now());

        when(expenseRepository.save(newExpense)).thenReturn(saveExpense);

        Expense result = expenseController.createExpense(newExpense);

        assertEquals(1L, result.getId());
        assertEquals("Books", result.getName());
    }

    @Test
    public void testUpdateExpense_Found() {
        Expense existing = new Expense(1L, "Old", 10.0, LocalDate.now());
        Expense update = new Expense(null, "Updated", 100.0, LocalDate.now());

        when(expenseRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(expenseRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        Expense result = expenseController.updateExpense(1L, update);

        assertEquals("Updated", result.getName());
        assertEquals(100.0, result.getAmount());
    }

    @Test
    public void testUpdateExpense_NotFound() {
        Expense update = new Expense(null, "Updated", 100.0, LocalDate.now());

        when(expenseRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            expenseController.updateExpense(1L, update);
        });
    }

    @Test
    public void testDeleteExpense() {
        doNothing().when(expenseRepository).deleteById(1L);

        expenseController.deleteExpense(1L);

        verify(expenseRepository, times(1)).deleteById(1L);
    }

}
