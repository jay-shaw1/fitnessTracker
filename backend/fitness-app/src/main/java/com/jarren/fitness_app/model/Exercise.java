package com.jarren.fitness_app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "exercises")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Exercise name is required.")
    private String name;

    @NotBlank(message = "Number of sets is required.")
    @Size(min = 1, max = 8, message = "The number of sets must be between 1 and 8.")
    private int setNum;

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

    public int getSetsNum(){return setNum;}
    public void setSetsNum(int setNum){this.setNum = setNum;}

    public Workout getWorkout(){return workout;}
    public void setWorkout(Workout workout){this.workout = workout;}

    public List<ExerciseSet> getSets(){return sets;}
    public void setSets(List<ExerciseSet> sets){this.sets = sets;}

}