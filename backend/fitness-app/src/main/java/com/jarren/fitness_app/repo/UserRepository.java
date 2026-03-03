package com.jarren.fitness_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jarren.fitness_app.model.User;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email); 
}