package com.jarren.fitness_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.jarren.fitness_app.model.ExerciseSet;
import com.jarren.fitness_app.repo.SetRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import org.springframework.http.ResponseEntity;
import jakarta.validation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/sets")
public class SetController {

    @Autowired
    private SetRepository setRepo;

    @PostMapping
    public ResponseEntity<?> CreateSet(@Valid @RequestBody ExerciseSet set) {
        return ResponseEntity.ok(setRepo.save(set));
    }

    @GetMapping
    public List<ExerciseSet> getAllSets() {
        return setRepo.findAll();
    }

    @GetMapping("/exercise/{exerciseId}")
    public List<ExerciseSet> getSetsByExercise(@PathVariable Long exerciseId) {
        return setRepo.findByExerciseId(exerciseId);
    }
    
}