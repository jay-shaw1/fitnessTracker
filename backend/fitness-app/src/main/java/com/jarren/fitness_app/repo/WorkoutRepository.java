package com.jarren.fitness_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jarren.fitness_app.model.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}