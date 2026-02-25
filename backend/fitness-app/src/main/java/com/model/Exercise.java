@Entity
@Table(name = "exercises")
public class Exercise {
    @Id
    @GenerateValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int reps;
    private int sets;
    private double rest;
    private int intensity;

    @ManyToOne
    @JoinColumn(name = 'workout_id')
    private Workout workout;

}