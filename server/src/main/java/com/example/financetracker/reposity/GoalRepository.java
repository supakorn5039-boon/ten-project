package com.example.financetracker.reposity;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.financetracker.entity.Goal;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
