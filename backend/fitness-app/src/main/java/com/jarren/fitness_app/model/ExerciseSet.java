package com.jarren.fitness_app.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "sets")
public class ExerciseSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int setNum;
    private int reps;
    private double weight;
    private int intensityLevel;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    @JsonBackReference
    private Exercise exercise;

    //getters and setters
    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public int getReps(){return reps;}
    public void setReps(int reps){this.reps = reps;}

    public double getWeight(){return weight;}
    public void setWeight(double weight){this.weight = weight;}

    public int getIntensityLevel(){return intensityLevel;}
    public void setIntensityLevel(int intensityLevel){this.intensityLevel = intensityLevel;}

    public Exercise getExercise(){return exercise;}
    public void setExercise(Exercise exercise){this.exercise = exercise;}

    public int getSetNum(){return setNum;}
    public void setSetNum(int setNum){this.setNum = setNum;}
}