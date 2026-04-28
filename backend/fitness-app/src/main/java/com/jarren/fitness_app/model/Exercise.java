package com.jarren.fitness_app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "exercises")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Exercise name is required.")
    private String name;

    @Min(value = 1, message = "You must have at least 1 set.")
    @Max(value = 8, message = "You can't have more than 8 sets.")
    private int setNum;

    @NotNull(message = "Workout is required.")
    @ManyToOne
    @JoinColumn(name = "workout_id")
    @JsonBackReference
    private Workout workout;

    @OneToMany(mappedBy = "exercise")
    @JsonManagedReference
    private List<ExerciseSet> sets;

    //getters and setters
    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getName(){return name;}
    public void setName(String name){this.name = name;}

    public int getSetNum(){return setNum;}
    public void setSetNum(int setNum){this.setNum = setNum;}

    public Workout getWorkout(){return workout;}
    public void setWorkout(Workout workout){this.workout = workout;}

    public List<ExerciseSet> getSets(){return sets;}
    public void setSets(List<ExerciseSet> sets){this.sets = sets;}

}