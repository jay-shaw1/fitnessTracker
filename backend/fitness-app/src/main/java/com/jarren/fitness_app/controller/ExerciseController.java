package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import com.jarren.fitness_app.repo.ExerciseRepository;
import com.jarren.fitness_app.model.Exercise;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import jakarta.validation.*;


@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseRepository exerciseRepo;

    ExerciseController(ExerciseRepository exerciseRepo){
        this.exerciseRepo = exerciseRepo;
    }

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
            return exerciseRepo.findByWorkout_UserIdAndNameContainingIgnoreCaseAndWorkout_Status(userId, name, "completed");
        }

        return new ArrayList<>();
    }

}