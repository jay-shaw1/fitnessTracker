package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.jarren.fitness_app.repo.UserRepository;
import com.jarren.fitness_app.model.User;
import java.util.List;

@CrossOrigin(origins = "*") //allows requests from any origin (for dev)
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest){

        //Retrieve users with same email
        List<User> users = userRepo.findByEmail(loginRequest.getEmail());

        //Check if users exist
        if (users.isEmpty()){
            return ResponseEntity.status(401).body("User not found.");
        }

        User user = users.get(0);
        //ResponseEntity<String> response = null;

        if (user.getPassword().equals(loginRequest.getPassword())){ //check if passwords match
                return ResponseEntity.ok(user); 
            }else{
                return ResponseEntity.status(401).body("Invalid password.");
            }

        /*
        //Iterate through users to check all
        for (User user : users){
            if (user.getPassword().equals(loginRequest.getPassword())){ //check if passwords match
                response = ResponseEntity.ok("Login successful!"); 
            }else{
                response = ResponseEntity.status(401).body("Invalid password.");
            }
        }*/

    }
}