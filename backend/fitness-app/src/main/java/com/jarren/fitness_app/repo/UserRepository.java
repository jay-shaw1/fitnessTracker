package com.jarren.fitness_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jarren.fitness_app.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}