const BASE_URL = "http://localhost:8080/api" //Store root to backend

async function createUser(username, email, password){
    try{
        const response = await fetch(`${BASE_URL}/users`,
        {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ username, email, password })
        });

        if (!response.ok){
            throw new Error('Sign up failed.');
        }
        return response.json();

    } catch (error) {
        console.error('createUser error: ', error);
    }
}

async function loginUser(email, password){
    try{
        const response = await fetch(`${BASE_URL}/users/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok){
            throw new Error(`Login failed.`);
        }

        return response.json();

    } catch (error) {
        console.error('loginUser error:', error);
    }
}

async function saveWorkout(userId, name, time, status){
    try{
        const response = await fetch(`${BASE_URL}/workouts`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ name, time, status,
                user : { id : userId }
             })
        });

        if (!response.ok){
            throw new Error('Unable to save workout.');
        }

        return response.json();

    } catch (error) {
        console.error('saveWorkout error: ', error);
    }
}

async function saveExercise(name, sets, workoutId){
    try{
        const response = await fetch(`${BASE_URL}/exercises`,
        {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ name, 
                setNum : sets,
                workout : { id : workoutId }
            })
        });

        if (!response.ok){
            throw new Error('Unable to save exercise.');
        }

        return response.json();

    } catch (error) {
        console.error('saveExercise error: ', error);
    }
}

async function saveSetApi(exerciseId, setNum, reps, weight, intensityLevel){
    try{
        const response = await fetch(`${BASE_URL}/sets`,
        {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ setNum, reps, weight, intensityLevel,
                exercise : { id : exerciseId }
            })
        });

        if (!response.ok){
            throw new Error('Unable to save set.');
        }

        return response.json();

    } catch (error) {
        console.error('saveSetApi error: ', error);
    }
}

async function endWorkout(workoutId){
    try{
        const response = await fetch(`${BASE_URL}/workouts/${workoutId}/complete`,
        {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        if (!response.ok){
            throw new Error('unable to end workout.');
        }

        return response.json();
        
    } catch (error) {
        console.error('endWorkout error: ', error);
    }
}

async function getWorkoutHistory(userId){
    const response = await fetch(`${BASE_URL}/workouts/users/${userId}`);
    return response.json();
}

async function getWorkout(workoutId){
    const response = await fetch(`${BASE_URL}/workouts/${workoutId}`)
    return response.json();
}

async function getExercisesByWorkout(workoutId){
    const response = await fetch(`${BASE_URL}/exercises/workout/${workoutId}`);
    return response.json();
}

async function getSetsByExercise(exerciseId){
    const response = await fetch(`${BASE_URL}/sets/exercise/${exerciseId}`);
    return response.json();
}

async function searchByWorkout(name, userId){
    const response = await fetch(`${BASE_URL}/workouts/search?name=${name}&userId=${userId}`);
    return response.json();
}

async function searchByExercise(name, userId){
    const response = await fetch(`${BASE_URL}/exercises/search?name=${name}&userId=${userId}`);
    return response.json();
}

async function searchByDate(date, userId){
    const response = await fetch(`${BASE_URL}/workouts/search?date=${date}&userId=${userId}`);
    return response.json();
}