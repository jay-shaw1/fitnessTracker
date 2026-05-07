package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.jarren.fitness_app.repo.WorkoutRepository;
import com.jarren.fitness_app.model.Workout;
import java.time.ZoneId;
import java.time.LocalDate;
import java.util.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.validation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutRepository workoutRepo;

    @PostMapping
    public ResponseEntity<?> createWorkout(@Valid @RequestBody Workout workout){
        workout.setDate(LocalDate.now(ZoneId.of("America/New_York")));
        return ResponseEntity.ok(workoutRepo.save(workout));
    }

    @GetMapping("/users/{userId}")
    public List<Workout> getWorkoutsByUser(@PathVariable Long userId){
        return workoutRepo.findByUser_IdAndStatusOrderByDateDesc(userId, "completed");
    }

    @GetMapping("/{id}")
    public Workout getWorkoutById(@PathVariable Long id) {
        return workoutRepo.findById(id).get();
    }
    
    //Redo to handle if Id doesn't exist
    @PatchMapping("/{id}/complete")
    public Workout updateStatus(@PathVariable Long id){
        Workout workout = workoutRepo.findById(id).get();
        workout.setStatus("completed");
        return workoutRepo.save(workout);
    }

    @GetMapping("/search")
    public List<Workout> searchWorkouts(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String date,
        @RequestParam Long userId) {
        
        if (name != null){
            return workoutRepo.findByUserIdAndNameContainingIgnoreCaseAndStatus(userId, name, "completed");
        } else if (date != null){

            return workoutRepo.findByUserIdAndDateAndStatus(userId, LocalDate.parse(date), "completed");
        }

        return new ArrayList<>();
    }

    @GetMapping("/in-progress/{userId}")
    public ResponseEntity<?> getInProgressWorkout(@PathVariable Long userId){
        List<Workout> workouts = workoutRepo.findByUserIdAndStatus(userId, "in_progress");

        if (workouts.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(workouts.get(0));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Workout> cancelWorkout(@PathVariable Long id){
        Optional<Workout> optional = workoutRepo.findById(id);

        if (optional.isEmpty()){
            return ResponseEntity.status(404).build();
        }

        Workout workout = optional.get();
        workout.setStatus("cancelled");
        workoutRepo.save(workout);
        return ResponseEntity.ok(workout);
    }
}