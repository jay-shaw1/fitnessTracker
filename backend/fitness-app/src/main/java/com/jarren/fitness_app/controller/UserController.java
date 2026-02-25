package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.jarren.fitness_app.repo.UserRepository;
import com.jarren.fitness_app.model.User;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepo;

    @PostMapping
    //creates data
    public User createUser(@RequestBody User user){
        return userRepo.save(user);
    }

    @GetMapping
    //reads data
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }
}