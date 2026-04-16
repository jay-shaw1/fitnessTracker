package com.jarren.fitness_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jarren.fitness_app.model.Workout;
import java.util.List;
import java.time.LocalDateTime;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUser_IdAndStatus(Long userId, boolean status);
    List<Workout> findByUserIdAndNameContainingIgnoreCase(Long userId, String name);
    List<Workout> findByUserIdAndDateBetween(Long userId, LocalDateTime start, LocalDateTime end);
}