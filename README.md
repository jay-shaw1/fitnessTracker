## Live Demo
Frontend: https://justfitness.netlify.app
Backend API: https://fitnesstracker-production-e386.up.railway.app/

# Just Fitness (JFit)

A full-stack workout tracking application built to log gym sessions in real time. You track workouts, exercises, and sets with reps and weight, then review your history on a dashboard.

This project was built as a learning exercise in full-stack development, covering REST API design, relational data modeling, authentication, and frontend/backend integration from scratch.

## Features

- User authentication with JWT tokens and BCrypt password hashing
- Create a workout session and log exercises in real time
- Track sets with reps and weight per exercise
- Resume an in-progress workout if you close the app mid-session
- Cancel a workout to discard it
- Dashboard showing completed workout history with expandable details
- Search workouts by name, exercise name, or date
- Fully responsive, custom-designed UI

## Tech Stack

**Backend**
- Java 17
- Spring Boot
- Spring Data JPA / Hibernate
- Spring Security with JWT
- PostgreSQL
- Maven

**Frontend**
- HTML, CSS, JavaScript (vanilla, no framework)
- Fetch API for backend communication
- sessionStorage for client-side state across the workout flow

**Tools**
- Postman for API testing
- pgAdmin for database management

Project Structure
```
fitness-app/
├── README.md
├── backend/
│   └── fitness-app/
│       └── src/main/java/com/jarren/fitness_app/
│           ├── model/         (User, Workout, Exercise, ExerciseSet)
│           ├── repository/    (Spring Data JPA repositories)
│           ├── controller/    (REST controllers)
│           └── security/      (JwtUtil, JwtFilter, SecurityConfig)
└── frontend/
    ├── index.html
    ├── style.css
    ├── js/
    │   ├── api.js     (all backend fetch calls)
    │   └── app.js     (UI logic and event handlers)
    └── pages/
        ├── signup.html
        ├── signin.html
        ├── dashboard.html
        ├── workout.html
        ├── exercise.html
        └── sets.html
```
## Data Model
```
User
 └── Workout (status: in_progress / completed)
      └── Exercise
           └── ExerciseSet (setNumber, reps, weight)
```
## Getting Started

### Prerequisites

- Java 17
- Maven
- PostgreSQL
- Node.js (only needed if using Live Server or similar for the frontend)

### Backend Setup

1. Clone the repo and navigate to the backend folder:
```
   cd backend/fitness-app
```
2. Create a PostgreSQL database:
```
   CREATE DATABASE fitness_db;
```

3. Set the following environment variables (or create a local `.env` / IDE run configuration):
```
   DB_URL=jdbc:postgresql://localhost:5432/fitness_db
   DB_USERNAME=postgres
   DB_PASSWORD=your_postgres_password
   JWT_SECRET=a_long_random_secret_key_at_least_32_characters
```
4. Run the application:
```
   ./mvnw spring-boot:run
```

### Frontend Setup

1. Navigate to the frontend folder:
```
   cd frontend
```

2. Open `index.html` with a local server (e.g. VS Code's Live Server extension). Opening it directly as a file may cause CORS issues.

3. Make sure `BASE_URL` in `js/api.js` points to your running backend:
```
   const BASE_URL = "http://localhost:8080/api";
```

## API Endpoints

| Method | Endpoint                          | Description                          |
|--------|------------------------------------|---------------------------------------|
| POST   | `/api/users`                       | Register a new user                   |
| POST   | `/api/users/login`                 | Log in, returns JWT token             |
| POST   | `/api/workouts`                    | Create a workout                      |
| GET    | `/api/workouts/users/{userId}`     | Get a user's workout history          |
| GET    | `/api/workouts/in-progress/{id}`   | Get a user's in-progress workout      |
| PATCH  | `/api/workouts/{id}/complete`      | Mark a workout as completed           |
| PATCH  | `/api/workouts/{id}/cancel`        | Cancel a workout                      |
| GET    | `/api/workouts/search`             | Search workouts by name or date       |
| POST   | `/api/exercises`                   | Create an exercise                    |
| GET    | `/api/exercises/workout/{id}`      | Get exercises for a workout           |
| GET    | `/api/exercises/search`            | Search exercises by name              |
| POST   | `/api/sets`                        | Log a set                             |
| GET    | `/api/sets/exercise/{id}`          | Get sets for an exercise              |


## What I Learned

This project was my first time building a complete full-stack application from the ground up. Key takeaways:

- Designing relational data models with proper foreign key relationships (User → Workout → Exercise → ExerciseSet)
- Implementing JWT-based authentication and understanding why stateless auth matters for REST APIs
- Handling real-world edge cases like resuming an interrupted session using a status field instead of saving everything at once
- Debugging CORS, Hibernate mapping errors, and JSON serialization issues (infinite recursion between bidirectional entity relationships)
- Writing clean, validated, and properly error-handled API endpoints

## Future Improvements

- Forgot password flow with email-based reset (JavaMailSender + Gmail SMTP)
- AI-generated workout plans based on user goals
- Progress charts and analytics over time
- Mobile app version

## Author

Jarren Shaw-Flores — Software Engineering student at Kennesaw State University. Built as a portfolio project to practice full-stack development end to end.