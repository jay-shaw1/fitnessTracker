package com.jarren.fitness_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "workouts")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Workout name is required.")
    private String name;
    
    private int time;
    private boolean status;
    private LocalDateTime date;

    @NotNull(message = "User is required.")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "workout")
    @JsonManagedReference
    private List<Exercise> exercises;

    //getters and setters
    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getName(){return name;}
    public void setName(String name){this.name = name;}

    public int getTime(){return time;}
    public void setTime(int time){this.time = time;}

    public boolean getStatus(){return status;}
    public void setStatus(boolean status){this.status = status;}

    public User getUser(){return user;}
    public void setUser(User user){this.user = user;}

    public List<Exercise> getExercises(){return exercises;}
    public void setExercises(List<Exercise> exercises){this.exercises = exercises;}

    public LocalDateTime getDate(){return date;}
    public void setDate(LocalDateTime date){this.date = date;}
}