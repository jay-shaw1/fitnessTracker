package com.jarren.fitness_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "exercises")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int reps;
    private int sets;
    private double restTime;
    private int intensityLevel;

    @ManyToOne
    @JoinColumn(name = "workout_id")
    private Workout workout;

    //getters and setters
    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getName(){return name;}
    public void setName(String name){this.name = name;}

    public int getReps(){return reps;}
    public void setReps(int reps){this.reps = reps;}

    public int getSets(){return sets;}
    public void setSets(int sets){this.sets = sets;}

    public double getRestTime(){return restTime;}
    public void setRestTime(double restTime){this.restTime = restTime;}

    public int getIntensityLevel(){return intensityLevel;}
    public void setIntensityLevel(int intensityLevel){this.intensityLevel = intensityLevel;}

    public Workout getWorkout(){return workout;}
    public void setWorkout(Workout workout){this.workout = workout;}

}