package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import com.jarren.fitness_app.repo.ExerciseRepository;
import com.jarren.fitness_app.model.Exercise;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseRepository exerciseRepo;

    @PostMapping
    public Exercise createExercise(@RequestBody Exercise exercise){
        return exerciseRepo.save(exercise);
    }

    @GetMapping
    public List<Exercise> getAllExercises(){
        return exerciseRepo.findAll();
    }

    @GetMapping("/workout/{workoutId}")
    public List<Exercise> getExercisesByWorkout(@PathVariable Long workoutId) {
        return exerciseRepo.findByWorkoutId(workoutId);
    }

}