package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.jarren.fitness_app.repo.WorkoutRepository;
import com.jarren.fitness_app.model.Workout;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



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

    @GetMapping("/users/{userId}")
    public List<Workout> getWorkoutsByUser(@PathVariable Long userId){
        return workoutRepo.findByUser_IdAndStatus(userId, false);
    }

    @GetMapping("/{id}")
    public Workout getWorkoutById(@PathVariable Long id) {
        return workoutRepo.findById(id).get();
    }
    
    //Redo to handle if Id doesn't exist
    @PatchMapping("/{id}/complete")
    public Workout updateStatus(@PathVariable Long id){
        Workout workout = workoutRepo.findById(id).get();
        workout.setStatus(false);
        return workoutRepo.save(workout);
    }

    @GetMapping("/search")
    public List<Workout> searchWorkouts(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String date,
        @RequestParam Long userId) {
        
        if (name != null){
            return workoutRepo.findByUserIdAndNameContainingIgnoreCase(userId, name);
        } else if (date != null){

            //check full day so user doesn't have to search for exact time
            LocalDateTime start = LocalDate.parse(date).atStartOfDay();
            LocalDateTime end = LocalDate.parse(date).atTime(23, 59, 59);
            return workoutRepo.findByUserIdAndDateBetween(userId, start, end);
        }

        return new ArrayList<>();
    }
}
