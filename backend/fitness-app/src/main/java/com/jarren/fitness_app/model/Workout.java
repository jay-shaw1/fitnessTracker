package com.jarren.fitness_app.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "workouts")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "workout")
    private List<Exercise> exercises;

    //getters and setters
    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public Long getTime(){return time;}
    public void setTime(Long time){this.time = time;}

    public User getUser(){return user;}
    public void setUser(User user){this.user = user;}

    public List<Exercise> getExercises(){return exercises;}
    public void setExercises(List<Exercise> exercises){this.exercises = exercises;}
}