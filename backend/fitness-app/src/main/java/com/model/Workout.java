@Entity
@Table(name = 'workouts')
public class Workout {
    @Id
    @GenerateValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany
    @JoinColumn(name = "exercise_name")
    private Exercise exercise;


}