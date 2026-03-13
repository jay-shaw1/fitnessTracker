package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.jarren.fitness_app.repo.WorkoutRepository;
import com.jarren.fitness_app.model.Workout;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutRepository workoutRepo;

    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout){
        workout.setDate(LocalDateTime.now());
        return workoutRepo.save(workout);
    }

    @GetMapping
    public List<Workout> getAllWorkouts(){
        return workoutRepo.findAll();
    }

    //Redo to handle if Id doesn't exist
    @PatchMapping("/{id}/complete")
    public Workout updateStatus(@PathVariable Long id){
        Workout workout = workoutRepo.findById(id).get();
        workout.setStatus(false);
        return workoutRepo.save(workout);
    }
}
