package com.jarren.fitness_app.controller;

import org.springframework.web.bind.annotation.*;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import jakarta.validation.*;
import com.jarren.fitness_app.repo.UserRepository;
import com.jarren.fitness_app.model.User;
import java.util.*;
import com.jarren.fitness_app.security.*;;

@CrossOrigin(origins = "*") //allows requests from any origin (for dev)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    //creates data
    public ResponseEntity<?> createUser(@Valid @RequestBody User user){
        return ResponseEntity.ok(userRepo.save(user));
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

        if (user.getPassword().equals(loginRequest.getPassword())){ //check if passwords match
            String token = jwtUtil.generateToken(user.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token); //send jwt to client
            response.put("userId", user.getId());
            response.put("username", user.getUsername());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid password.");

    }
}