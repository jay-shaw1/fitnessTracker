package com.jarren.fitness_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jarren.fitness_app.model.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long>{
}