package com.jarren.fitness_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.jarren.fitness_app.model.ExerciseSet;
import com.jarren.fitness_app.repo.SetRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;



@RestController
@RequestMapping("/api/sets")
public class SetController {

    @Autowired
    private SetRepository setRepo;

    @PostMapping
    public ExerciseSet CreateSet(@RequestBody ExerciseSet set) {
        return setRepo.save(set);
    }

    @GetMapping
    public List<ExerciseSet> getAllSets() {
        return setRepo.findAll();
    }
}