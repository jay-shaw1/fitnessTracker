package com.jarren.fitness_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jarren.fitness_app.model.ExerciseSet;
import java.util.List;

public interface SetRepository extends JpaRepository<ExerciseSet, Long>{
    List<ExerciseSet> findByExerciseId(Long exerciseId);
}