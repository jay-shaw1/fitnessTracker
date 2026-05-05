package com.jarren.fitness_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jarren.fitness_app.model.Workout;
import java.util.List;
import java.time.LocalDate;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUser_IdAndStatusOrderByDateDesc(Long userId, Boolean status);
    List<Workout> findByUserIdAndNameContainingIgnoreCaseAndStatus(Long userId, String name, Boolean status);
    List<Workout> findByUserIdAndDateAndStatus(Long userId, LocalDate date, Boolean status);
}