package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.jarren.fitness_app.repo.WorkoutRepository;
import com.jarren.fitness_app.model.Workout;
import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutRepository workoutRepo;

    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout){
        return workoutRepo.save(workout);
    }

    @GetMapping
    public List<Workout> getAllWorkouts(){
        return workoutRepo.findAll();
    }

    //Redo to handle if Id doesn't exist
    @PatchMapping("/{id}/true")
    public Workout updateStatus(@PathVariable Long id){
        Workout workout = workoutRepo.findById(id).get();
        workout.setStatus(true);
        return workoutRepo.save(workout);
    }
}
