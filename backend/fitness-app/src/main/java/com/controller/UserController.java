@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepo;

    @PostMapping
    //creates data
    public User createUser(@RequestBody User user){
        return userRepo.save(user);
    }

    @GetMapping
    //reads data
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }
}