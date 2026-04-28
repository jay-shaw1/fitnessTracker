package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import com.jarren.fitness_app.repo.ExerciseRepository;
import com.jarren.fitness_app.model.Exercise;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import jakarta.validation.*;


@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseRepository exerciseRepo;

    @PostMapping
    public ResponseEntity<?> createExercise(@Valid @RequestBody Exercise exercise){
        return ResponseEntity.ok(exerciseRepo.save(exercise));
    }

    @GetMapping
    public List<Exercise> getAllExercises(){
        return exerciseRepo.findAll();
    }

    @GetMapping("/workout/{workoutId}")
    public List<Exercise> getExercisesByWorkout(@PathVariable Long workoutId) {
        return exerciseRepo.findByWorkoutId(workoutId);
    }

    @GetMapping("/search")
    public List<Exercise> searchExercises(
        @RequestParam(required = false) String name,
        @RequestParam Long userId) {
        
        if (name != null){
            return exerciseRepo.findByWorkout_UserIdAndNameContainingIgnoreCase(userId, name);
        }

        return new ArrayList<>();
    }

}